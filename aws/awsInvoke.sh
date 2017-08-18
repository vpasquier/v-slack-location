#!/bin/sh -e

[[ -z "$1" ]] && echo "Lambda name must be provided. Example ./awsInvoke.sh myLambda {\"type\": \"bla\"}" && exit 1;
[[ -z "$2" ]] && echo "Lambda payload must be provided. Example ./awsInvoke.sh myLambda {\"type\": \"bla\"}" && exit 1;

aws lambda invoke \
    --function-name "$1" \
    --payload "$2" \
    output.txt

echo "Lambda output:"
cat output.txt
echo ""