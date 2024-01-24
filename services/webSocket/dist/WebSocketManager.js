"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketManager = void 0;
const ws_1 = __importDefault(require("ws"));
const socketEvents_1 = require("./socketEvents");
const lodash_1 = __importDefault(require("lodash"));
class WebSocketManager {
    constructor(server) {
        Object.defineProperty(this, "wss", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "registerEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (socket, events) => {
                lodash_1.default.forEach(events, (e) => {
                    socket.on(e.eventName, e.fn);
                });
            }
        });
        this.wss = new ws_1.default.Server({ server: server });
    }
    open() {
        const that = this;
        this.wss.on('connection', function (ws) {
            console.log("Connected");
            that.registerEvents(ws, socketEvents_1.events);
            // var stream = new WebSocketJSONStream(ws);
            // share.listen(stream);
        });
    }
    close() {
        this.wss.close();
    }
}
exports.WebSocketManager = WebSocketManager;
//# sourceMappingURL=WebSocketManager.js.map