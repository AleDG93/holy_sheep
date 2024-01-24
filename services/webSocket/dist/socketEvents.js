"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const err = {
    eventName: "error",
    fn: () => {
        console.error;
    }
};
const message = {
    eventName: "message",
    fn: (data) => {
        console.log('received: %s', data);
    }
};
const emit = {
    eventName: "",
    fn: () => {
        console.log("emit event");
    }
};
exports.events = [err, message, emit];
//# sourceMappingURL=socketEvents.js.map