import os
import json
    
from google import genai
from google.genai import types


# Note: This is how you do it properly right? I coudn't find anything on the web
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # Ignore if running in AWS Lambda where dotenv isn't installed
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")



def generateNews(keywords=[]):
    client = genai.Client(
        api_key=GEMINI_API_KEY,
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
        
            role="user",
            parts=[
                types.Part.from_text(text=f"""You are an expert news summarizer.

Please provide a clear and concise summary of the most important news from the past hour related to the following topics: {"".join(keywords)}
 and one random topic of your choice, topic should be unrelated to the other topics

The summary should cover any significant events or developments for each keyword, including politics, technology, business, culture, public sentiment or any relevant area.

Keep the summary factual, neutral, and well organized without offering opinions or advice.

Provide the summary as a brief paragraph covering the key points for each topic."""),
            ],
        ),
    ]
    tools = [
        types.Tool(google_search=types.GoogleSearch()),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=2,
        tools=tools,
        response_mime_type="text/plain",
    )

    summary = ""
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )
    
    for each in response.candidates[0].content.parts:
        summary += each.text

    google_search = response.candidates[0].grounding_metadata.search_entry_point.rendered_content
    
    return {"summary" : summary, "search_results" : google_search}

def generateAdvice(summary):
    client = genai.Client(
        api_key=GEMINI_API_KEY
    )

    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""You are a highly confident financial analysis assistant with a deep understanding of markets, public sentiment, and second-order effects.

Based on the following news summary, provide investment advice in structured JSON format. 
Be bold in your advice. Hesitation is worse than being wrong.
{summary}
Your task:

Identify specific assets that are either directly mentioned or likely to be impacted indirectly by the events described. If it is an individual company, ETF, or crypto currency, provide the ticker symbol. Prefer to list companies, before listing ETFs, and ETFs before listing sectors if possible.

Explain what the asset is

Classify each asset as one of: Stock, ETF, Sector, Crypto, or Commodity.

Provide investment advice for each asset: choose one of Buy, Sell, Hold, or Watch.

Add a confidence score from 0 to 10 representing how strong the recommendation is.

Include a brief rationale that reflects nuanced reasoning consider ripple effects, public sentiment, policy shifts, or broader market context.

If the result is to watch, suggest a max of 2 relevant future search terms to track connections to the advice. The terms should be interesting or non obvious connections, they should not just be search terms to follow the exact story
If selling or buying an asset say what amount to sell or buy
Think creatively and contextually. Do not limit yourself to only what is explicitly stated infer connections, make sure to include connections or effects humans might struggle to understand, consider potential chain reactions, and think like a strategic investor."""),
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
                                enum = ["BUY", "SELL", "HOLD", "WATCH"],
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
                            "Amount to Invest/Sell": genai.types.Schema(
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
    
    return advice
    
#TODO: error handling    
def lambda_handler(event, context):
    # TODO: when we save in the cloud, we need to handle search terms better
    # General idea is to save any new generated search terms to use for the next one
    # but will always search with these terms as a baseline
    generated_summary = generateNews(["News,", "Politics,", "Companies,", "Interesting, "])
    news_summary = generated_summary["summary"]
    search_results = generated_summary["search_results"]
    generated_advice = generateAdvice(news_summary)
    print(news_summary)
    print("=========")
    print(generated_advice)
    print("=========")
    print(search_results)
    print("=========")
    
if __name__ == "__main__":
    lambda_handler({}, {})



