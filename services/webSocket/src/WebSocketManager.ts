import { Server } from "http";
import WebSocket from "ws";
import { events } from "./socketEvents";
import _ from "lodash";

export interface SocketEvent {
    eventName: string;
    fn: (data?: any) => void;
}

export class WebSocketManager {

    private wss: WebSocket.Server;

    constructor(server: Server) {
        this.wss = new WebSocket.Server({ server: server });
    }

    public open() {
        const that = this;
        this.wss.on('connection', function (ws: any) {
            console.log("Connected");
            that.registerEvents(ws, events);
            // var stream = new WebSocketJSONStream(ws);
            // share.listen(stream);
        });
    }

    public close() {
        this.wss.close();
    }

    private registerEvents = (socket: WebSocket, events: SocketEvent[]) => {
        _.forEach(events, (e: SocketEvent) => {
            socket.on(e.eventName, e.fn);
        })
    }
}
