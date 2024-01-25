import { ChangeStream, ChangeStreamDocument, Collection } from "mongodb";
import { GameLogic } from "../interfaces/game";
import _ from "lodash";
import { Game } from "@adalgobbo/commons/lib";
import { Server } from "socket.io";

export class Streamer {

    collection: Collection<Game>;
    changeStream: ChangeStream<Document, ChangeStreamDocument<Document>>;
    server!: Server;

    constructor(collection: Collection<Game>) {
        this.collection = collection;
        this.changeStream = this.collection.watch();
    }

    attachServer(server: Server) {
        this.server = server;
    }

    setupStreamActions(gameLogic: GameLogic[]): void {
        _.forEach(gameLogic, (gl: GameLogic) => {
            this.changeStream.on(gl.actionName, gl.actionFunction);
        })
    }
}