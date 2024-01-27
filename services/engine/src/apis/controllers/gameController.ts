import { Request, Response } from "express";
import { gameServer } from "../../index";
import { Connector, MongoConfig } from "../../dbManager";
import { Game } from "../../models/Game";

const config: MongoConfig = {
    username: process.env.MONGO_USER || "admin",
    password: process.env.MONGO_PASSWORD || "adminpassword",
    addresses: [
        {
            address: process.env.MONGO_ADDRESS_1 || "mongo-db-1",
            port: process.env.MONGO_PORT_1 || "27017",
        },
        // {
        //     address: process.env.MONGO_ADDRESS_2 || "172.10.0.12",
        //     port: process.env.MONGO_PORT_2 || "27017",
        // },
        // {
        //     address: process.env.MONGO_ADDRESS_3 || "172.10.0.13",
        //     port: process.env.MONGO_PORT_3 || "27017",
        // }
    ],
    dbName: process.env.MONGO_DB_NAME || "holy_sheep_db"
}
export const PostGame = async (_: Request<{ gameName: string }, any, any, any>, response: Response<any>) => {

    await gameServer.createGame("gamedb", new Game("f"));

    // const connector = new Connector(config);
    // await connector.connect();
    // var newPlayer = new Player(0, "playerName", 10, 0, []);
    // var heaven = new Heaven(0, 0, new Array(12).fill(0));
    // var game = {
    //     "turn": 0,
    //     "players": [newPlayer],
    //     "cards": [],
    //     "button": 0,
    //     "prevDice": 0,
    //     "heaven": [heaven]
    // }
    // const insertResult = await connector.insertDocument('myGame', game);
    // console.log('Inserted document:', insertResult.insertedId);

    // const collection = await connector.getCollection<Game>("myGame");
    // const col = await collection.find({}).toArray();
    // console.log(col)
    response.sendStatus(200);
}

export const PostGameAction = async (_: Request<{ gameName: string }, any, any, any>, response: Response<any>) => {

    gameServer.createGame("gamedb", new Game("f"));
    const connector = new Connector(config);
    await connector.connect();
    await connector.insertDocument("gamedb", {
        "turn": 0,
        "players": "[newPlayer]",
        "cards": [],
        "button": 0,
        "prevDice": 0,
        "heaven": "[heaven]"
    });
    // const connector = new Connector(config);
    // await connector.connect();
    // var newPlayer = new Player(0, "playerName", 10, 0, []);
    // var heaven = new Heaven(0, 0, new Array(12).fill(0));
    // var game = {
    //     "turn": 0,
    //     "players": [newPlayer],
    //     "cards": [],
    //     "button": 0,
    //     "prevDice": 0,
    //     "heaven": [heaven]
    // }
    // const insertResult = await connector.insertDocument('myGame', game);
    // console.log('Inserted document:', insertResult.insertedId);

    // const collection = await connector.getCollection<Game>("myGame");
    // const col = await collection.find({}).toArray();
    // console.log(col)
    response.sendStatus(200);
}

export const GetGame = async (_: Request<{ gameName: string }, any, any, any>, response: Response<any>) => {

    const connector = new Connector(config);
    await connector.connect();
    const data = await connector.findDocuments("gamedb", {});
    console.log(data)
    response.json(data);
}
