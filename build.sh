#!/bin/sh -e

if [ ! -f ./config.json ]; then
    echo "Unable to build Lambda.zip! \"config.json\" is required!"
    exit 1
fi

npm install

rm -rf ./dist
mkdir -p dist

#TODO
#npm test

zip -r -q dist/lambda.zip ./ -x ./*\.sh ./.git/**\* ./dist ./spec ./aws ./.idea
