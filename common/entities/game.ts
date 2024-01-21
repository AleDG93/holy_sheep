import { Card } from "./card";
import { Player } from "./player";

export class Game {

    player: Player[];
    card: Card;

    constructor(player: Player[], card: Card) {
        this.player = player;
        this.card = card;
    }
}