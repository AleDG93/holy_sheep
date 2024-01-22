"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player, card) {
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "card", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.player = player;
        this.card = card;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map