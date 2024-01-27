import { Socket } from "socket.io";
import { Streamer } from "../dbManager";
import { SocketEvent, events } from "./socketEvents";
import _ from "lodash";
import { Player } from "../../../../commons/src/models/player";
import { Game } from "../models/Game";
import { ChangeStreamDocument, Document } from "mongodb";

export class GameEngine {

    streamer: Streamer;
    game!: Game;
    gameId: string;
    players: Player[]

    constructor(gameId: string, streamer: Streamer) {
        this.gameId = gameId;
        this.players = [];
        this.streamer = streamer;
    }

    public setupStream(streamer: Streamer) {
        this.streamer = streamer;
    }

    public setupGame(game: Game) {
        this.game = game;
        const engine = this;
        // Setup socket events 
        this.streamer.server.on('connection', function (ws: Socket) {
            console.log("Connected");
            engine.players.push({ ws: ws } as unknown as Player & { ws: Socket })
            engine.registerScoketEvents(ws, events);
        });
        // Setup events occurring at files changes
        this.streamer.changeStream.on("change", next => {
            this.interpret(next)
        })
    }

    public registerPlayer(player: Player) {
        const existingPlayer = _.find(this.players, (p: Player) => p.id == player.id);
        if (!existingPlayer) {
            this.players.push(player);
        }
        this.game
    }

    public deregisterPlayer(playerId: string) {
        const index = _.findIndex(this.players, (p: Player) => p.id == playerId);
        if (index == -1) {
            return;
        }
        this.players.splice(index, 1);
    }

    private interpret(operation: ChangeStreamDocument<Document>) {

        /**
         * According to game rules setup broadcast conent
        */
        switch (operation.operationType) {
            case 'insert':
                this.broadcast('foo', operation.fullDocument)
                console.log("HERE IN INSERT")
                break;

            case 'update':
                console.log("HERE IN UPDATE")
                this.broadcast('bar', operation.updateDescription);
        }

    }

    private broadcast(ev: string, data: any) {
        _.forEach(this.players, (player: Player) => player.socket.emit(ev, data))
    }

    private registerScoketEvents(socket: Socket, events: SocketEvent[]) {
        _.forEach(events, (e: SocketEvent) => {
            socket.on(e.eventName, e.fn);
        })
    }
}