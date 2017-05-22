#!/usr/bin/env bash

export S3_BUCKET=simple-api
export AWS_PROFILE=calvindn
export STACK_NAME=simple-api

aws --profile $AWS_PROFILE s3 mb s3://$S3_BUCKET

zip -r lambda/lambda.zip lambda/lambda.js lambda/simple.js lambda/config.json lambda/node_modules/moment lambda/node_modules/node-uuid

aws --profile $AWS_PROFILE s3 cp lambda/lambda.zip s3://$S3_BUCKET/lambda.zip

aws --profile $AWS_PROFILE cloudformation create-stack --stack-name $STACK_NAME --template-body file://template.json --capabilities CAPABILITY_IAM --parameters ParameterKey=S3Bucket,ParameterValue=$S3_BUCKET

aws --profile $AWS_PROFILE cloudformation wait stack-create-complete

export API_ID=`aws --profile $AWS_PROFILE cloudformation describe-stacks --stack-name $STACK_NAME --query Stacks[0].Outputs[0].OutputValue --output text`

export ApiGatewayEndpoint="$API_ID.execute-api.us-east-1.amazonaws.com/v1"

echo "Setup complete. Endpoint: $ApiGatewayEndpoint"