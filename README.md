# Chuck Norris Dragon Facts

## Background

This application displays random Chuck Norris facts using the [Chuck Norris API](https://api.chucknorris.io/) with majestic Dragon ASCII art.

Originally adapted from Cowsay Node by Bibby Chung.  
Modified for DevOps training purposes by the DevOps Training Team.

**Note:** Chuck Norris doesn't read documentation. Documentation reads Chuck Norris.

## Features

- 🐉 Majestic Dragon ASCII art display
- 💪 Random Chuck Norris facts
- 🏥 Health check endpoint at `/health`
- 🔧 Configurable environment variables
- 🔒 Security headers with Helmet
- 📦 Gzip compression

## To run locally

(1) Make sure you have node & npm installed  
(2) Install all dependencies using `npm install`  
(3) Set environment variables (optional):

- `PORT` - Server port (default: 3000)
- `APP_NAME` - Application name (default: "Chuck Norris Facts")
- `ENVIRONMENT` - Environment name (default: "development")

(4) Run `npm start`  
(5) Open browser to <http://localhost:3000>

## Endpoints

- `/` - Get a random Chuck Norris fact with Dragon ASCII art
- `/:text` - Display custom text with Dragon ASCII art
- `/health` - Health check endpoint (returns JSON)

Enjoy it! 🐉💥
# containers
