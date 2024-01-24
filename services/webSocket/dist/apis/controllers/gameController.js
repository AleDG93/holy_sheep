"use strict";
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
exports.CreateGame = void 0;
const Connector_1 = __importDefault(require("../../dbManager/Connector"));
const CreateGame = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    const connector = new Connector_1.default('mongodb://localhost:27017', 'gamedb');
    const insertResult = yield connector.insertDocument('myGame', { title: "gameTitle" });
    console.log('Inserted document:', insertResult.insertedId);
    response.sendStatus(200);
    // var gameName = '';
    // var playerName = '';
    // if (req.body['game'] && req.body['playerName']) {
    //     gameName = req.body['game']
    //     playerName = req.body['playerName']
    // } else {
    //     gameName = req.cookies('game');
    //     playerName = req.cookies('playerName');
    // }
    // connection.createFetchQuery(gameName, {}, {}, function (err: any, results: any) {
    //     if (err) {
    //         throw err;
    //     }
    //     if (results.length === 0) {
    //         var doc = connection.get(gameName, '0');
    //         var newPlayer = new Player(0, playerName, 10, 0, []);
    //         var heaven = new Heaven(0, 0, new Array(12).fill(0));
    //         var game = {
    //             "turn": 0,
    //             "players": [newPlayer],
    //             "cards": [],
    //             "button": 0,
    //             "prevDice": 0,
    //             "heaven": [heaven]
    //         }
    //         doc.create(game);
    //         res.cookie('game', gameName);
    //         res.cookie('playerName', playerName);
    //         res.cookie('id', 0);
    //         res.render('pages/game')
    //     } else {
    //         var doc = connection.get(gameName, '0');
    //         var wasRefresh = false;
    //         doc.data.players.forEach((player: any) => {
    //             if (player.name == playerName) {
    //                 wasRefresh = true;
    //             }
    //         });
    //         if (!wasRefresh) {
    //             var id = results[0].data.players.length;
    //             var newPlayer = new Player(id, playerName, 10, 0, []);
    //             doc.submitOp([{ p: ['players', results[0].data.players.length], li: newPlayer }]);
    //             res.cookie('game', gameName);
    //             res.cookie('playerName', playerName);
    //             res.cookie('id', id);
    //         }
    //         res.render('pages/game')
    //     }
    // });
});
exports.CreateGame = CreateGame;
//# sourceMappingURL=gameController.js.map