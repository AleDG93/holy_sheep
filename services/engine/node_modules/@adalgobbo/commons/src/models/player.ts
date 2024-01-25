export class Player {
    id: number;
    name: string;
    numOfSheep: number;
    position: any;
    gadget: any[];
    heaven: number;
    win: boolean;

    constructor(id: number, name: string, numOfSheep: number, position: any, gadget: any[]) {
        this.id = id;
        this.name = name;
        this.numOfSheep = numOfSheep;
        this.position = position;
        this.gadget = gadget;
        this.heaven = 0;
        this.win = false;
    }
}