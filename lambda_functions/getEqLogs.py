import json
from boto3 import resource
from decimal import Decimal

dynamodb = resource('dynamodb')
table = dynamodb.Table('EqLogs')

def lambda_handler(event, context):
    # Scan the table
    try:
        response = table.scan()
        items = response.get('Items', [])
    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Failed to scan table: {str(e)}"
        }

    # Sort the items by Timestamp
    items.sort(key=lambda x: x.get('Timestamp', ''), reverse=True)

    # Remove ExpiryTime attribute from the items
    for item in items:
        item.pop('ExpiryTime', None)

    # Send the data in json array
    return {
        "statusCode": 200,
        "headers": { "Access-Control-Allow-Origin": "*" },
        "body": json.dumps(items, cls=DecimalEncoder)
    }

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)
