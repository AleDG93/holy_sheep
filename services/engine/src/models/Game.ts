import _ from "lodash";

export interface GamePlayerInterface {
    attributes: Record<string, any>;
    id: string;

}
export class GamePlayer implements GamePlayerInterface {

    attributes: Record<string, any>;
    id: string;
    constructor(id: string, attributes: Record<string, any>) {
        this.id = id;
        this.attributes = attributes;
    }
}
export interface GameObjectInterface {
    id: string;
    name: string;
    attributes: Record<string, any>;
}
export class GameObject implements GameObjectInterface {

    id: string;
    name: string;
    attributes: Record<string, any>;
    constructor(id: string, name: string, attributes: Record<string, any>) {
        this.id = id;
        this.name = name;
        this.attributes = attributes;
    }
}
export interface GameRuleInterface {
    attributes: Record<string, Array<(r: any) => void>>;
    id: string;

}
export class GameRule implements GameRuleInterface {

    attributes: Record<string, Array<(r: any) => void>>;
    id: string;
    constructor(id: string, attributes: Record<string, Array<(r: any) => {}>>) {
        this.id = id;
        this.attributes = attributes;
    }
}

export interface GameLogicInterface {
    id: string;
    name?: string;
    validation: (rule: GameRule) => boolean | undefined;
    logic: (target: GameObject | GamePlayer | GameAttribute) => void;

}
export class GameLogic implements GameLogicInterface {

    id: string;
    name?: string;
    validation: (rule: GameRule) => boolean | undefined;
    logic: (target: GameObject | GamePlayer | GameAttribute) => void;

    constructor(id: string, logic: (target: GameObject | GamePlayer) => {}, validation: (rule: GameRule) => boolean) {
        this.id = id;
        this.validation = validation;
        this.logic = logic;
    }

    public run(target: GameObject | GamePlayer, rule: GameRule) {
        if (!this.validation(rule)) {
            console.log("Cannot perform this action");
            return;
        }
        this.logic(target);
    }
}

export interface GameAttributeInterface {
    id: string;
    name: string;
    value: any;

}

export class GameAttribute implements GameAttributeInterface {

    id: string;
    name: string;
    value: any;

    constructor(id: string, name: string, value: any) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}
export interface GameInterface {
    id?: string;
    attributes: GameAttributeInterface[];
    objects: GameObjectInterface[];
    rules: GameRuleInterface[];
    logics: GameLogicInterface[];
    players: GamePlayerInterface[];
}

export class Game implements GameInterface {

    // turn: number;
    // room: string;
    // cards: Card[];
    // button: number;
    // previousDice: number;
    id: string;
    attributes: GameAttribute[];
    objects: GameObject[];
    rules: GameRule[];
    logics: GameLogic[];
    players: GamePlayer[];

    constructor(id: string) {
        // this.room = room;
        // this.turn = 0;
        // this.cards = [];
        // this.button = 0;
        // this.previousDice = 0;
        this.id = id;
        this.attributes = [];
        this.objects = [];
        this.logics = [];
        this.players = [];
        this.rules = [];
    }

    public addPlayer(player: GamePlayer) {
        const existingPlayer = _.find(this.players, (p: GamePlayer) => p.id == player.id);
        if (!existingPlayer) {
            this.players.push(player);
        }
    }

    public getPlayer(playerId: string) {
        return _.find(this.players, (p: GamePlayer) => p.id == playerId);
    }

    public setRules(gameRules: GameRule[]) {
        this.rules = gameRules;
    }

    public setLogics(gameLogics: GameLogic[]) {
        this.logics = gameLogics;
    }

    public setObjects(gameObjects: GameObject[]) {
        this.objects = gameObjects;
    }

    public setAttributes(gameAttributes: GameAttribute[]) {
        this.attributes = gameAttributes;
    }
}

export enum GameTypes {
    HOLY_SHEEP = "HolySheep"
}
