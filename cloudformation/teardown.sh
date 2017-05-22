#!/usr/bin/env bash

export AWS_PROFILE=calvindn
export STACK_NAME=simple-api

aws --profile $AWS_PROFILE cloudformation delete-stack --stack-name $STACK_NAME

aws --profile $AWS_PROFILE cloudformation wait stack-delete-complete

echo 'Teardown complete'