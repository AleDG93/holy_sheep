import { Card } from "@adalgobbo/commons/lib";
import { GameInterface, GamePlayerInterface, GameLogicInterface, GameAttribute } from "../models/Game";
import _ from "lodash";

const holySheep: GameInterface = {

    attributes: [
        { id: "a1", name: "turn", value: 0 },
        { id: "playerTurn", name: "playerTurn", value: "" }
    ],
    objects: [
        {
            id: "deck", name: "deck", attributes: { "cards": Array<Card> }
        },
        {
            id: "die1", name: "die", attributes: {
                "numOfFaces": 6,
                "output": undefined
            }
        },
        {
            id: "die2", name: "die", attributes: {
                "numOfFaces": 6,
                "output": undefined
            }
        }
    ],
    players: [{ id: "player1", attributes: { "numberOfSheep": 10, "position": 0 } }],
    logics: [{
        id: "advanceOneSpace",
        validation(_rule) {
            return true;
        },
        logic(target) {
            const position = (target as GamePlayerInterface).attributes["position"];
            (target as GamePlayerInterface).attributes["position"] = position + 1;
        }
    }],
    rules: [
        {
            id: "init",
            attributes: {
                "firtTurn": [
                    (targetGame: GameInterface) => {
                        const playerTurn = _.find(targetGame.attributes, (a: GameAttribute) => a.id == "playerTurn");
                        if (!playerTurn) {
                            return;
                        }
                        playerTurn.value = targetGame.players[0]?.id;
                        return;
                    }
                ]
            }
        },
        {
            id: "gameRules",
            attributes: {
                "advanceOneSpace": [
                    (targetPlayer: GamePlayerInterface) => targetPlayer.attributes["position"] = 3
                ]
            }
        }]
}


export default holySheep;