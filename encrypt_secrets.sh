#!/bin/sh

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Missing .env file"
    exit 0
fi

export $(grep -v '^#' .env | xargs)

# Check if file for service account credentials exists
if [ ! -f $GOOGLE_CREDENTIALS_FILE_PATH ]; then
    echo "Missing service account credentials"
    exit 0
fi

# Check if 'secrets'-directory exists
if [ ! -d ./secrets ]; then
    mkdir secrets
fi

echo "Encrypting service account credentials"
openssl base64 -A -in $GOOGLE_CREDENTIALS_FILE_PATH -out ./secrets/service_account.txt

echo "Encrypting .env"
openssl base64 -A -in .env -out ./secrets/.env.txt


