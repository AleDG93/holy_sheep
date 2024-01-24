import { Player } from "@adalgobbo/commons/src/models/player"
import { Card } from "@adalgobbo/commons/src/models/card"
import { Heaven } from "@adalgobbo/commons/src/models/heaven"
import { Document } from "mongodb"

export interface Game extends Document {
    "turn": number,
    "players": Player[],
    "cards": Card[],
    "button": number,
    "previousDice": number,
    "heaven": Heaven[]
}