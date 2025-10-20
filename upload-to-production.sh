#!/bin/bash

# Upload Excel file to production database
# Replace YOUR_PUBLISHED_URL with your actual Replit published URL

if [ -z "$1" ]; then
    echo "Usage: ./upload-to-production.sh YOUR_PUBLISHED_URL"
    echo "Example: ./upload-to-production.sh https://your-app.replit.app"
    exit 1
fi

PROD_URL=$1
EXCEL_FILE="./attached_assets/Digital humanities (2)_1760906077666.xlsx"

echo "Uploading Excel file to $PROD_URL..."

curl -X POST "$PROD_URL/api/upload-excel" \
  -F "file=@$EXCEL_FILE" \
  -H "Accept: application/json"

echo ""
echo "Upload complete! Check your published site now."
