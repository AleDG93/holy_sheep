import { Server } from "socket.io";

export interface SocketEvent {
    eventName: string;
    fn: (socket?: Server, data?: any) => void;
}

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
    fn: (socket) => {
        socket?.close();
    }
}



export const events = [err, message, emit, disconnect];


