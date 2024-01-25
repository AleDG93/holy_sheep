import { Router } from "express";
import { GetGame, PostGame, PostGameAction } from "./controllers/gameController";


const setupRoutes = (router: Router) => {

    router.post("/game", PostGame)
    router.get("/game", GetGame)
    router.post("/game/action", PostGameAction);
}


export default setupRoutes;