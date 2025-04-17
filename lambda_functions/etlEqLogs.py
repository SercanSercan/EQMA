import re
import time
import urllib.request
from bs4 import BeautifulSoup
from decimal import Decimal
import boto3

MAX_LINES = 100
TARGET_URL = "http://www.koeri.boun.edu.tr/scripts/lst9.asp"

def lambda_handler(event, context):
    # Extract
    content = fetchHTMLContent()
    if content == None:
        return {
            'statusCode': 500,
            'body': 'HTML fetch operation failed on target URL'
        }

    # Transform
    raw_logs = extractLogs(content)
    eq_json_logs = parseLogs(raw_logs)

    # Load
    loadIntoDynamoDB(eq_json_logs)

    return {
        'statusCode': 200,
        'body': 'Earthquake logs loaded into DynamoDB table successfully'
    }

def fetchHTMLContent():
    content = None
    try:
        with urllib.request.urlopen(TARGET_URL) as response:
            content_bytes = response.read()
            encoding = response.headers.get_content_charset(failobj="iso-8859-9") # fallback for Turkish charset
            content = content_bytes.decode(encoding)
    except Exception as e:
        print(f"Error: {e}")

    return content

def extractLogs(content):
    soup = BeautifulSoup(content, 'html.parser')
    return soup.find('pre').text

def parseLogs(raw_logs):
    eq_logs = []
    lines = raw_logs.split('\n')
    lines = [line.replace('\xa0', " ").strip() for line in lines]
    expiryTime = int(time.time()) + 60 * 60 * 24

    eq_log_pattern = re.compile(
        r'^(\d{4}\.\d{2}\.\d{2})\s+'                 # Date
        r'(\d{2}:\d{2}:\d{2})\s+'                    # Time
        r'([\d\.]+)\s+'                              # Latitude
        r'([\d\.]+)\s+'                              # Longitude
        r'([\d\.]+)\s+'                              # Depth
        r'(\S+)\s+(\S+)\s+(\S+)\s+'                  # MD ML Mw
        r'(.+?)\s{2,}'                               # Place
        r'(\S+)'                                     # Quality
        r'(?:\s+\(\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}\))?$'  # Optional review timestamp
    )

    for i in range(MAX_LINES):
        if i >= len(lines):
            print("Reached end of logs")
            break

        line = lines[i]
        match = eq_log_pattern.match(line)
        if match:
            date, time_str, lat, lon, depth, md, ml, mw, place, quality = match.groups()
            current_log = {
                'Timestamp': date + " " + time_str,
                'Latitude': Decimal(lat),
                'Longitude': Decimal(lon),
                'Depth': Decimal(depth),
                'Magnitude': Decimal(ml),
                'Location': place,
                'Quality': quality,
                'ExpiryTime': expiryTime
            }
            eq_logs.append(current_log)

    print(eq_logs)
    return eq_logs

def loadIntoDynamoDB(eq_json_logs):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('EqLogs')

    with table.batch_writer(overwrite_by_pkeys=['Timestamp']) as batch:
        for item in eq_json_logs:
            batch.put_item(Item=item)
