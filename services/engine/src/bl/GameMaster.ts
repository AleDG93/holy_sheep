import { Socket } from "socket.io";
import { GameLogic, Streamer } from "../dbManager";
import { events } from "./socketEvents";
import { SocketEvent } from "./GameEngine";
import _ from "lodash";

export enum GameTypes {
    HOLY_SHEEP = "HolySheep"
}
export class GameMaster {

    streamer: Streamer;
    game: GameTypes;
    actions: GameLogic[];
    gameRoom: string;

    constructor(streamer: Streamer, game: GameTypes, gameRoom: string) {
        this.streamer = streamer;
        this.game = game;
        this.gameRoom = gameRoom;
        this.actions = [];
    }

    setup() {
        const that = this;
        this.streamer.changeStream.on("change", next => {
            this.streamer.server.on('connection', function (ws: Socket) {
                console.log("HERE IN CONNECT")
                switch (next.operationType) {
                    case 'insert':
                        console.log("HERE IN INSERT")
                        that.streamer.server.emit('foo', next.fullDocument);
                        console.log(next.fullDocument);
                        break;

                    case 'update':
                        console.log("HERE IN UPDATE")
                        that.streamer.server.emit('foo', "next.updateDescription.updatedFields.message");
                        console.log("next.updateDescription.updatedFields.message");
                }
                console.log("Connected");
                that.registerEvents(ws, events);
                // var stream = new WebSocketJSONStream(ws);
                // share.listen(stream);
            });
        })

    }

    private registerEvents = (socket: Socket, events: SocketEvent[]) => {
        _.forEach(events, (e: SocketEvent) => {
            socket.on(e.eventName, e.fn);
        })
    }
}