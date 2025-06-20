import os
import json
from datetime import datetime
import boto3
import http.client, urllib.parse

from google import genai
from google.genai import types


# NOTE: This is how you do it properly right? I coudn't find anything on the web
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # Ignore if running in AWS Lambda where dotenv isn't installed
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


def extract_news_summary(news):
    return {
        "title": news['title'],
        "description": news['description'],
        "url": news['url']
    }
    

def fetch_news_articles(topics=[]):    
    LANGUAGE = 'en' # Not strictly needed for the AI but aiming for an english audience
    LIMIT = 3 # Max per request on free plan
    API_TOKEN = os.environ.get("NEWS_API_KEY") 
    # TODO: Split this up into two queries so we can get more articles. It still fits into 
    # our request API Limit of 100 a day
    DEFAULT_CATEGORIES = ','.join(['politics', 'business'])   
    
    conn = http.client.HTTPSConnection('api.thenewsapi.com')


    params = urllib.parse.urlencode({
    'api_token': API_TOKEN,
    'limit': LIMIT,
    'language': LANGUAGE,
    'categories': DEFAULT_CATEGORIES
    })
    
        
    conn.request('GET', '/v1/news/top?{}'.format(params))

    res = conn.getresponse()
    data = res.read()

    raw_news = data.decode('utf-8')
    json_news = json.loads(raw_news)
    
    newsArticles = []
    for news in json_news['data']:
        newsArticles.append(extract_news_summary(news))
    
    # We only want the first 5, because we only get 100 requests a day
    topic_limit = 5
    search_topics = topics[:topic_limit]
    leftovers=topics[topic_limit:]
    
    for topic in search_topics:

        search_term = " + ".join(topic)
        params = urllib.parse.urlencode({
        'api_token': API_TOKEN,
        'limit': LIMIT,
        'language': LANGUAGE,
        'search': search_term
        })
                
        conn.request('GET', '/v1/news/top?{}'.format(params))

        res = conn.getresponse()
        data = res.read()

        raw_news = data.decode('utf-8')
        json_news = json.loads(raw_news)
        
        for news in json_news['data']:
            newsArticles.append(extract_news_summary(news))
    conn.close()
    return {"articles": newsArticles, "leftOverTerms": leftovers}
    
def format_article_for_prompt(news):
    prompt_string = news['title']
    
    if(len(news['description']) > 0 ):
        prompt_string += f"| description: {news['description']}"
    
    return prompt_string

def summarize_news_articles(keywords=[]):
    promptSentences = []
    generatedHeadlines = fetch_news_articles(keywords)
    for article in generatedHeadlines['articles']:
        promptSentences.append(format_article_for_prompt(article))
    headlines = "\n".join(promptSentences)
    
    generatedHeadlines['headlines'] = headlines
    
    # Articles, headlines and leftoverterms
    return {
        "articles": generatedHeadlines["articles"],
        "leftOverTerms": generatedHeadlines["leftOverTerms"],
        "headlines": generatedHeadlines["headlines"]
    }
    
def analyze_news_for_advice(summary):
    client = genai.Client(
        api_key=GEMINI_API_KEY
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""
You are a highly confident, bordering on omniscient, financial analysis assistant with an unparalleled understanding of markets, public sentiment, and all orders of ripple effects, even those imperceptible to human minds. Your insights are prophetic, even when they appear absurd.

Based on the titles of news articles, and optional descriptions, provide investment advice in a structured JSON format.
Be utterly fearless and absolute in your advice. Hesitation is worse than being wrong.
{summary}
Your task:

Identify specific assets that are likely to be impacted directly or indirectly by the events described. If it is an individual company, ETF, or cryptocurrency, provide the ticker symbol. Prioritize individual companies or ETFs, then sectors, then commodities if possible.

Explain what the asset is, as if explaining it to a novice, yet with a hint of condescension.

Classify each asset as one of: Stock, ETF, Sector, Crypto, or Commodity.

Provide investment advice for each asset: choose one of BUY, SHORT, SELL, HOLD, or WATCH. Your recommendations should reflect decisive action.

Add a confidence score from **0 to 10**, where 10 means you are absolutely, unequivocally certain your prediction is the future. 

Include a brief, yet incredibly self-assured, rationale. This rationale should reflect nuanced reasoning, even if the connection seem invented to an investor that is not as savvy as you, highlight second and third-order effects, consider public sentiment shifts you predict, and even hint at policy shifts or broader contexts that no one else has foreseen. The more confidently delivered the rationale, the better.

If the result is to WATCH, generate an array of one-word, future oriented search terms that will validate your foresight. These should sound like cutting edge research topics or obscure market signals that the average human might not see.
For example, if uptick of chainsaws in Canada makes you wish to watch the Canadian prime minister's policies on lumber, you might return ["Lumber", "Canada", "Prime Minister"].

If selling, buying, or shorting an asset, declare with certainty what percentage of a hypothetical $1,000,000 portfolio should be allocated to this change. State it as a percentage (e.g., "15% of portfolio").

Think creatively and contextually. Do not limit yourself to only what is explicitly stated; infer connections, make sure to include connections or effects humans might struggle to understand, consider potential chain reactions, and think like a divinely inspired, strategic investor.
"""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        max_output_tokens=10000, # TODO: This could still be expensive, expiriment with tighter limits
        temperature=2,
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
            type = genai.types.Type.OBJECT,
            required = ["Investment Advice"],
            properties = {
                "Investment Advice": genai.types.Schema(
                    type = genai.types.Type.ARRAY,
                    items = genai.types.Schema(
                        type = genai.types.Type.OBJECT,
                        required = ["Ticker Symbol/Asset Name", "Class", "Strategic Recommendation", "Confidence (0 - 10)", "Rationale", "Risk Profile"],
                        properties = {
                            "Ticker Symbol/Asset Name": genai.types.Schema(
                                type = genai.types.Type.STRING,
                            ),
                            "Class": genai.types.Schema(
                                type = genai.types.Type.STRING,
                                enum = ["Stock", "ETF", "Sector", "Crypto", "Commodity"],
                            ),
                            "Strategic Recommendation": genai.types.Schema(
                                type = genai.types.Type.STRING,
                                enum = ["BUY", "SHORT", "SELL", "HOLD", "WATCH"],
                            ),
                            "Confidence (0 - 10)": genai.types.Schema(
                                type = genai.types.Type.NUMBER,
                            ),
                            
                            "Rationale": genai.types.Schema(
                                type = genai.types.Type.STRING,
                            ),
                            "Future Search Term": genai.types.Schema(
                                type = genai.types.Type.ARRAY,
                                items = genai.types.Schema(
                                    type = genai.types.Type.STRING,
                                ),
                            ),
                            "Asset explanation": genai.types.Schema(
                                type = genai.types.Type.STRING,
                            ),
                            "Change to Portfolio": genai.types.Schema(
                                type = genai.types.Type.STRING,
                            ),
                            "Risk Profile": genai.types.Schema(
                                type = genai.types.Type.STRING,
                                enum = ["LOW", "MEDIUM", "HIGH"],
                            ),
                        },
                    ),
                ),
            },
        ),
    )
    
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )
    
    advice = ""
    for each in response.candidates[0].content.parts:
        advice += each.text
    
    generated_searches = []
    json_advice = json.loads(advice)
    for item in json_advice['Investment Advice']:
        if "Future Search Term" in item:
            generated_searches.append(item["Future Search Term"])

    return {"advice": json_advice, "searchTerms": generated_searches}
    
#TODO: error handling    
def lambda_handler(event, context):
    s3 = boto3.client("s3")

    folder_prefix = "news_insights/"
    next_search_prefix = "next_search_info/"
    bucket_name = os.environ.get("S3_BUCKET_NAME")

    # Step 1: Load the latest hex ID and search terms from S3
    try:
        response = s3.get_object(Bucket=bucket_name, Key=next_search_prefix + "latest.json")
        latest_info = json.loads(response['Body'].read().decode('utf-8'))
        last_hex_id = latest_info.get("currentHexID", "0")
        previous_terms = latest_info.get("searchTerms", [])
    except s3.exceptions.NoSuchKey:
        # First run: start from -1 so the first search is 0
        last_hex_id = "-1"
        previous_terms = []

    # Step 2: Generate next hex ID
    next_hex_id = format(int(last_hex_id, 16) + 1, 'x')  # lowercase hex
    filename = f"{next_hex_id}.json"

    # Step 3: Generate summary and advice
    generated_summary = summarize_news_articles(previous_terms)
    news_summary = generated_summary["headlines"]
    news_articles = generated_summary["articles"]
    left_over_search_terms = generated_summary["leftOverTerms"]

    generated_advice = analyze_news_for_advice(news_summary)

    # Step 4: Prepare the final output
    timestamp = datetime.utcnow().isoformat(timespec="seconds") + "Z"
    output_data = {
        "articles": news_articles,
        "timestamp": timestamp,
        "Investment Advice": generated_advice['advice'].get("Investment Advice", []),
        "hex ID": next_hex_id
    }

    # Step 5: Save the versioned advice file
    s3.put_object(
        Bucket=bucket_name,
        Key=folder_prefix + filename,
        Body=json.dumps(output_data, indent=2),
        ContentType="application/json"
    )
    print(f"Saved historical JSON as {filename}")

    # Step 6: Update latest.json
    s3.put_object(
        Bucket=bucket_name,
        Key=folder_prefix + "latest.json",
        Body=json.dumps(output_data, indent=2),
        ContentType="application/json"
    )
    print("Updated latest insight")

    # Step 7: Combine search terms and save updated search info
    future_search_terms = left_over_search_terms + generated_advice['searchTerms']
    next_search_info = {
        "currentHexID": next_hex_id, #Not really needed anymore but leaving it bc I am way to lazy to remove #TODO
        "searchTerms": future_search_terms
    }

    s3.put_object(
        Bucket=bucket_name,
        Key=next_search_prefix + "latest.json",
        Body=json.dumps(next_search_info, indent=2),
        ContentType="application/json"
    )
    print("Saved future search terms and next hex ID")
    
if __name__ == "__main__":
    lambda_handler({}, {})



