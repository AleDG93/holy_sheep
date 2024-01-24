import { Router } from "express";
import { CreateGame } from "./controllers/gameController";


const setupRoutes = (router: Router) => {

    router.post("/game", CreateGame)
}


export default setupRoutes;