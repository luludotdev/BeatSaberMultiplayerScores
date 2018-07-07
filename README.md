# Beat Saber Multiplayer Scores
Hooks into andruzzzhka's multiplayer mod and shows live scores.

## Prerequisites
* [Beat Saber Multiplayer](https://github.com/andruzzzhka/BeatSaberMultiplayer/) (version 4.2 or later)
* WebSockets enabled on the server (change `WSEnabled` to `true`)
* WebSocket port forwarded correctly (see settings)

## Usage
1. Build the project yourself (see below) or visit a [selfhosted version](http://bsaber.jackbaron.com).
2. Connect to the server using the websocket URL. If the server IP is `saber.jackbaron.com` and the WebSocket port is `3702`, then enter `ws://saber.jackbaron.com:3702`
3. This will give you a link to the live page. You can then copy and paste this page's URL into OBS.

## Building
To build from scratch you need Node.js (version 8 or newer) and npm.  
Install dependencies with `npm i` and then run `npm run build` to build the React project.  
You can then serve the static site wherever.

Alternatively you can build using Docker and Docker Compose.  
Build with `docker-compose build` and then serve with `docker-compose up -d`  
The server will be available under port 3699
