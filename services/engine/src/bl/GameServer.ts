import { Server } from "http";
import _ from "lodash";
import { Server as SocketServer } from "socket.io";
import { Connector, MongoConfig } from "../dbManager";
import { GameEngine } from "./GameEngine";
import { Game } from "../models/Game";

const config: MongoConfig = {
    username: process.env.MONGO_USER || "admin",
    password: process.env.MONGO_PASSWORD || "adminpassword",
    addresses: [
        {
            address: process.env.MONGO_ADDRESS_1 || "mongo-db-1",
            port: process.env.MONGO_PORT_1 || "27017",
        }
    ],
    dbName: process.env.MONGO_DB_NAME || "holy_sheep_db"
}

export class GameServer {

    private socket: SocketServer;
    private connector: Connector;
    private gameEngines: GameEngine[];

    constructor(server: Server) {

        this.connector = new Connector(config);
        this.socket = new SocketServer(server,
            {
                cors: {
                    origin: "http://localhost:5173"
                }
            }
        );
        this.gameEngines = [];
    }

    public async start() {
        await this.connector.connect();
    }

    public async createEngine(gameId: string) {
        const streamer = this.connector.getStreamer(gameId);
        streamer.attachServer(this.socket);
        const engine = new GameEngine(gameId, streamer);
        this.gameEngines.push(engine);
    }

    public createGame(gameId: string, game: Game) {
        const gameEngine = _.find(this.gameEngines, (ge: GameEngine) => ge.gameId == gameId);
        if (!gameEngine) {
            console.log(`Cannot find engine for id: ${gameId}`);
            return;
        }
        gameEngine.setupGame(game);
        return;
    }

    public close() {
        this.socket.close();
    }
}
