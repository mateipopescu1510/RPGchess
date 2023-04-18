import { INFINITE_RANGE, Direction, Side, PieceTypes, PieceAbilities } from "./Enums";

export class Piece {
    private type: PieceTypes;
    private side: Side;
    private level: number;
    private currentXP: number;
    private range: number[];
    private directions: Direction[];
    private abilities: PieceAbilities[];

    constructor(type: PieceTypes = PieceTypes.EMPTY, side: Side = Side.NONE,
        level: number = 0, currentXP: number = 0,
        range: number[] = [0], directions: Direction[] = [],
        abilities: PieceAbilities[] = []) {

        this.type = type;
        this.side = side;
        this.level = level;
        this.currentXP = currentXP;
        this.range = range;
        this.directions = directions;
        this.abilities = abilities;
    }

    setDirections(directions: Direction[]) {
        this.directions = directions;
    }

    getDirections(): Direction[] {
        return this.directions;
    }

    setRange(range: number[]) {
        this.range = range;
    }

    getRange(): number[] {
        return this.range;
    }

    setLevel(level: number) {
        this.level = level;
    }

    getLevel(): number {
        return this.level;
    }

    setXP(xp: number) {
        this.currentXP = xp;
    }

    getXP(): number {
        return this.currentXP;
    }

    setType(type: PieceTypes) {
        this.type = type;
    }

    getType(): PieceTypes {
        return this.type;
    }

    setSide(side: Side) {
        this.side = side;
    }

    getSide(): Side {
        return this.side;
    }


    // addAbility(ability: PieceAbilities) {
    // if (!this.abilities.includes(ability))
    // this.abilities.push(ability);
    // }
}
