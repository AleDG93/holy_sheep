"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const WebSocketManager_1 = require("./WebSocketManager");
const router_1 = __importDefault(require("./apis/router"));
const body_parser_1 = __importDefault(require("body-parser")); // Importing the default export
const dbManager_1 = require("./dbManager");
// var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
// var path = require('path');
const port = 4000;
const setup = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbManager_1.run)();
    // Create a web server to serve files and listen to WebSocket connections
    const server = http.createServer(app).listen(8080);
    // Create web socket
    const wsm = new WebSocketManager_1.WebSocketManager(server);
    wsm.open();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    const router = express_1.default.Router({ mergeParams: true });
    (0, router_1.default)(router);
    app.use("/", router);
    app.listen(port, () => {
        return console.log(`Server listening at http://localhost:${port}`);
    });
});
var app = (0, express_1.default)();
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
//# sourceMappingURL=index.js.map