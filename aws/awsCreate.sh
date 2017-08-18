#!/bin/sh -e

[[ -z "$1" ]] && echo "Lambda name must be provided. Example ./createLambda.sh myLambda \"arn:aws:iam::123456789:role/lambda_basic_execution\"" && exit 1;
[[ -z "$2" ]] && echo "IAM Role ARN must be provided. Example ./createLambda.sh myLambda \"arn:aws:iam::123456789:role/lambda_basic_execution\"" && exit 1;

./build.sh

aws lambda create-function \
    --function-name "$1" \
    --runtime nodejs6.10 \
    --role "$2" \
    --handler lambda.handler \
    --description "Slack Location" \
    --timeout 60 \
    --memory-size 128 \
    --zip-file fileb://$(pwd)/dist/lambda.zip