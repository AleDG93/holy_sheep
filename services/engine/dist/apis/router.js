"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameController_1 = require("./controllers/gameController");
const setupRoutes = (router) => {
    router.post("/game", gameController_1.CreateGame);
};
exports.default = setupRoutes;
//# sourceMappingURL=router.js.map