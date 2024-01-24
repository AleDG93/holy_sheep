import { SocketEvent } from "./WebSocketManager";

const err: SocketEvent = {
    eventName: "error",
    fn: () => {
        console.error
    }
}

const message: SocketEvent = {
    eventName: "message",
    fn: (data: string) => {
        console.log('received: %s', data);
    }
}

const emit: SocketEvent = {
    eventName: "",
    fn: () => {
        console.log("emit event")
    }
}


export const events = [err, message, emit];


