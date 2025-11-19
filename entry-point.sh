#!/bin/sh


PORT=${1:-3000}


export PORT=$PORT

echo "Starting Chuck Norris Dragon Facts app on port $PORT"
echo "App: $APP_NAME"
echo "Environment: $ENVIRONMENT"


exec node index.js
