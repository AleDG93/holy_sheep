import * as http from 'http';
import express from 'express';
import { WebSocketManager } from './WebSocketManager';
import setupRoutes from './apis/router';
import bodyParser from 'body-parser'; // Importing the default export

// var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
// var path = require('path');

const port = 4000;
const setup = async (app: any) => {

    // Create a web server to serve files and listen to WebSocket connections
    const server = http.createServer(app).listen(8080);
    // Create web socket
    const wsm = new WebSocketManager(server);
    wsm.open();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    const router = express.Router({ mergeParams: true });
    setupRoutes(router)
    app.use("/", router);
    app.listen(port, () => {
        return console.log(`Server listening at http://localhost:${port}`);
    });

}

var app = express();
setup(app);



// app.post('/game', function (req: any, res: any) {

//     var gameName = '';
//     var playerName = '';

//     if (req.body['game'] && req.body['playerName']) {
//         gameName = req.body['game']
//         playerName = req.body['playerName']
//     } else {
//         gameName = req.cookies('game');
//         playerName = req.cookies('playerName');
//     }

//     connection.createFetchQuery(gameName, {}, {}, function (err: any, results: any) {
//         if (err) {
//             throw err;
//         }
//         if (results.length === 0) {
//             var doc = connection.get(gameName, '0');
//             var newPlayer = new Player(0, playerName, 10, 0, []);
//             var heaven = new Heaven(0, 0, new Array(12).fill(0));
//             var game = {
//                 "turn": 0,
//                 "players": [newPlayer],
//                 "cards": [],
//                 "button": 0,
//                 "prevDice": 0,
//                 "heaven": [heaven]
//             }
//             doc.create(game);
//             res.cookie('game', gameName);
//             res.cookie('playerName', playerName);
//             res.cookie('id', 0);
//             res.render('pages/game')
//         } else {
//             var doc = connection.get(gameName, '0');
//             var wasRefresh = false;
//             doc.data.players.forEach((player: any) => {
//                 if (player.name == playerName) {
//                     wasRefresh = true;
//                 }
//             });
//             if (!wasRefresh) {
//                 var id = results[0].data.players.length;
//                 var newPlayer = new Player(id, playerName, 10, 0, []);
//                 doc.submitOp([{ p: ['players', results[0].data.players.length], li: newPlayer }]);
//                 res.cookie('game', gameName);
//                 res.cookie('playerName', playerName);
//                 res.cookie('id', id);

//             }
//             res.render('pages/game')
//         }
//     });
// });



