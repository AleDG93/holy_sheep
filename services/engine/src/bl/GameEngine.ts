import { Server } from "http";
import _ from "lodash";
import { Server as SocketServer } from "socket.io";
import { Connector, MongoConfig, Streamer } from "../dbManager";
import { GameMaster, GameTypes } from "./GameMaster";

export interface SocketEvent {
    eventName: string;
    fn: (socket?: SocketServer, data?: any) => void;
}

export interface StreamerEvent {
    eventName: string;
    fn: (streamer?: Streamer, data?: any) => void;
}

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

export class GameEngine {

    private socket: SocketServer;
    private connector: Connector;
    private gameMasters: GameMaster[];
    constructor(server: Server) {

        this.connector = new Connector(config);
        this.socket = new SocketServer(server,
            {
                cors: {
                    origin: "http://localhost:5173"
                }
            }
        );
        this.gameMasters = [];
    }

    public async start() {
        await this.connector.connect();
    }

    public async open(gameRoom: string) {
        await this.createGame(gameRoom);
    }

    public async createGame(gameRoom: string) {
        const streamer = this.connector.getStreamer(gameRoom);
        streamer.attachServer(this.socket);
        const gameMaster = new GameMaster(streamer, GameTypes.HOLY_SHEEP, gameRoom);
        gameMaster.setup()
        this.gameMasters.push(gameMaster);
    }

    // public action(gameRoom: string, gameAction: string) {
    //     // const mast = _.find(this.gameMasters, (gm: GameMaster) => gm.gameRoom == gameRoom);
    //     // mast?.setup(gameAction);
    // }

    public close() {
        this.socket.close();
    }
}
