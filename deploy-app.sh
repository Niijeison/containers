#!/bin/bash

IMAGE="jeison-chuck-dragon"
PORT=3000

echo "Building Docker image..."
docker build -t $IMAGE .

echo "Running container..."
docker run -d \
  -e APP_NAME="Chuck Norris Dragon" \
  -e ENVIRONMENT="development" \
  -p 5001:$PORT \
  --name chuckdragon \
  $IMAGE

echo "App running at: http://localhost:5001"
echo "Test health endpoint using:"
echo "curl http://localhost:5001/health"
