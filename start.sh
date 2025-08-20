#!/bin/bash

echo "Starting applications in Development Mode..."

# # Create network if it doesn't exist
# if ! docker network ls | grep -q "avanty-network"; then
#     echo "Creating avanty-network..."
#     docker network create avanty-network
# fi

# Start Backend (API + MySQL)
echo "Starting Backend (API + MySQL)..."
cd avanty-mail-be

if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    echo "Please create .env file with development configuration"
    exit 1
fi

docker-compose up -d
echo "Waiting for backend to be ready..."
sleep 10


# Start FE (Admin Frontend)
echo "Starting Admin Frontend (avanty-mail-fe)..."
cd ../avanty-mail-fe

if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    echo "Please create .env file with development configuration"
    exit 1
fi

docker-compose up -d
echo "Waiting for backend to be ready..."
sleep 10

# Start Website
echo "Starting Web Page..."
cd ../web-page

if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    echo "Please create .env file with development configuration"
    exit 1
fi

docker-compose up -d
echo "Waiting for backend to be ready..."
sleep 10