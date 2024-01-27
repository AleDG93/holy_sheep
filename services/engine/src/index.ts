import * as http from 'http';
import express, { Express } from 'express';
import { GameServer } from './bl/GameServer';
import setupRoutes from './apis/router';
import bodyParser from 'body-parser'; // Importing the default export
import * as dotenv from "dotenv";
// var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
// var path = require('path');
let gameServer: GameServer;
const serverPort = 3000;
const socketPort = 8080;
dotenv.config();
const setupServer = async (app: Express) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    const router = express.Router({ mergeParams: true });
    setupRoutes(router)
    app.use("/", router);
    app.listen(serverPort, () => {
        return console.log(`Server listening at http://localhost:${serverPort}`);
    });
}

const setupEngine = async (app: Express) => {

    // Create a web server to serve files and listen to WebSocket connections
    const server = http.createServer(app);
    // Create web socket
    gameServer = new GameServer(server);
    await gameServer.start()
    // await gameEngine.open("holy_sheep");
    server.listen(socketPort, () => {
        console.log(`Socket listening at http://localhost:${socketPort}`);
    });
}

const server = express();
const engine = express();
setupServer(server);
setupEngine(engine);

export { gameServer };