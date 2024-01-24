import { Request, Response } from "express";
import Connector from "../../dbManager/Connector";
import { Player } from "@adalgobbo/commons/src/models/player";
import { Heaven } from "@adalgobbo/commons/src/models/heaven";



export const CreateGame = async (_: Request<{ gameName: string }, any, any, any>, response: Response<any>) => {

    const connector = new Connector('mongodb://admin:adminpassword@localhost:27017', 'gamedb');
    await connector.connect();
    var newPlayer = new Player(0, "playerName", 10, 0, []);
    var heaven = new Heaven(0, 0, new Array(12).fill(0));
    var game = {
        "turn": 0,
        "players": [newPlayer],
        "cards": [],
        "button": 0,
        "prevDice": 0,
        "heaven": [heaven]
    }
    const insertResult = await connector.insertDocument('myGame', game);
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

}
