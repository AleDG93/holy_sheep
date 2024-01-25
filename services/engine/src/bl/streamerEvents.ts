import { StreamerEvent } from "./GameEngine";

const change: StreamerEvent = {
    eventName: "change",
    fn: (next: any) => {
        switch (next.operationType) {
            case 'insert':
                console.log(next.fullDocument.message);
                break;
            case 'update':
                console.log(next.updateDescription.updatedFields.message);
        }
    }
}



export const stremerEvents = [change];


