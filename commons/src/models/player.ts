import { Socket } from "socket.io";

export class Player {
    id: string;
    nickname: string;
    status: string;
    socket: Socket;

    constructor(id: string, nickname: string, status: string, socket: Socket) {
        this.id = id;
        this.status = status;
        this.nickname = nickname;
        this.socket = socket;
    }
}