import { SocketEvent } from "./GameEngine";

const err: SocketEvent = {
    eventName: "error",
    fn: () => {
        console.error
    }
}

const message: SocketEvent = {
    eventName: "message",
    fn: (_, data: string) => {
        console.log('received: %s', data);
    }
}

const emit: SocketEvent = {
    eventName: "emit",
    fn: (socket, _) => {
        const message = "Message(msg)";
        if (!socket) {
            return;
        }
        socket.emit('foo', message); // Broadcast the message to all connected clients
    }
}

const disconnect: SocketEvent = {
    eventName: "disconnect",
    fn: () => {
        console.log("user disconnected!")
    }
}



export const events = [err, message, emit, disconnect];


