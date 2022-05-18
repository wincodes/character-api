#!/usr/bin/env bash

set -e

if [ -z "$1" ]; then
    ENVIRONMENT="development"
else ENVIRONMENT="$1"
fi

echo ">>> Start app in $NODE_ENV"

export NODE_ENV="$ENVIRONMENT"


if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
  npm run start
elif [ "$NODE_ENV" == "test" ]; then
  npm run devv
else
  npm run dev
fi