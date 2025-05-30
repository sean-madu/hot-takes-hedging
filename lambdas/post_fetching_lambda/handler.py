import json
import boto3
import os


# NOTE: This is how you do it properly right? I coudn't find anything on the web
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # Ignore if running in AWS Lambda where dotenv isn't installed

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

def lambda_handler(event, context):
    s3 = boto3.client("s3")
    bucket_name = os.environ.get("S3_BUCKET_NAME")
    folder_prefix = "news_insights/"

    http_method = event.get('requestContext', {}).get('http', {}).get('method')
    path = event.get('requestContext', {}).get('http', {}).get('path')
    query_string_parameters = event.get('queryStringParameters', {})

    if http_method == 'GET' and path == '/refresh':
        return get_latest_and_five(s3, bucket_name, folder_prefix)
    elif http_method == 'GET' and path == '/posts':
        return get_paginated_posts(s3, bucket_name, folder_prefix, query_string_parameters)
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' # TODO: use frontend domain in production
            },
            'body': json.dumps({'message': 'Invalid API endpoint or method'})
        }

def get_latest_and_five(s3, bucket_name, folder_prefix):
    """
    Retrieves the latest post and the next 5 preceding posts.
    """
    try:
        # Get the latest post
        latest_response = s3.get_object(Bucket=bucket_name, Key=folder_prefix + "latest.json")
        latest_post = json.loads(latest_response['Body'].read().decode('utf-8'))
        
        # Get the current ID from next_search_info to get the next 5 posts
        next_search_info_response = s3.get_object(Bucket=bucket_name, Key="next_search_info/latest.json")
        next_search_info = json.loads(next_search_info_response['Body'].read().decode('utf-8'))
        current_hex_id = next_search_info.get("currentHexID", "0")

        all_posts = [latest_post]
        current_id_int = int(current_hex_id, 16)

        # Retrieve the 5 preceding posts
        for i in range(1, 6): # Get 5 posts
            prev_id_int = current_id_int - i
            if prev_id_int < 0: # Stop if we go below 0
                break
            prev_hex_id = format(prev_id_int, 'x')
            prev_filename = f"{prev_hex_id}.json"
            
            try:
                prev_response = s3.get_object(Bucket=bucket_name, Key=folder_prefix + prev_filename)
                all_posts.append(json.loads(prev_response['Body'].read().decode('utf-8')))
            except s3.exceptions.NoSuchKey:
                # If a file is not found, it means we've reached the beginning of available posts
                break

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(all_posts, indent=2)
        }
    except s3.exceptions.NoSuchKey:
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'No posts found.'})
        }
    except Exception as e:
        print(f"Error retrieving latest and five posts: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Error retrieving posts', 'error': str(e)})
        }

def get_paginated_posts(s3, bucket_name, folder_prefix, query_params):
    """
    Retrieves a specified number of posts starting from a given ID,
    and moving backwards.
    Query parameters:
        - start_id: The hexadecimal ID to start from (inclusive).
        - count: The number of posts to retrieve (default: 5).
    """
    start_id_hex = query_params.get('start_id')
    count_str = query_params.get('count', '5')

    if not start_id_hex:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Missing start_id query parameter'})
        }
    
    try:
        start_id_int = int(start_id_hex, 16)
        count = int(count_str)
        if count <= 0:
            raise ValueError("Count must be a positive integer.")
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Invalid start_id or count parameter. start_id must be a hex string, count must be an integer.'})
        }

    posts = []
    # Start from the `start_id` and go backwards
    for i in range(count):
        current_id_to_fetch_int = start_id_int - i
        if current_id_to_fetch_int < 0:
            break # Stop if we go below 0

        current_id_to_fetch_hex = format(current_id_to_fetch_int, 'x')
        filename = f"{current_id_to_fetch_hex}.json"

        try:
            response = s3.get_object(Bucket=bucket_name, Key=folder_prefix + filename)
            posts.append(json.loads(response['Body'].read().decode('utf-8')))
        except Exception as e:
            print(f"Error fetching file {filename}: {e}")
            break

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(posts, indent=2)
    }