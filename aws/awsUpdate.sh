#!/bin/sh -e

[[ -z "$1" ]] && echo "Lambda name must be provided. Example ./awsUpdate.sh myLambda" && exit 1;

./build.sh

aws lambda update-function-code \
  --function-name "$1" \
  --zip-file fileb://$(pwd)/dist/lambda.zip