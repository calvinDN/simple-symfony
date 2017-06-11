#!/usr/bin/env bash

export AWS_PROFILE=calvindn
export STACK_NAME=simple-api

export API_ID=`aws --profile $AWS_PROFILE cloudformation describe-stacks --stack-name $STACK_NAME --query Stacks[0].Outputs[0].OutputValue --output text`

export ApiGatewayEndpoint="$API_ID.execute-api.us-east-1.amazonaws.com/v1"

echo "Setup complete. Endpoint: $ApiGatewayEndpoint"