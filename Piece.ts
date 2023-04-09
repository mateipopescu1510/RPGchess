import { INFINITE_RANGE, Direction, Side, PieceTypes, PieceAbilities } from "./Enums";

export class Piece {
    type: PieceTypes;
    side: Side;
    level: number;
    currentXP: number;
    range: number[];
    directions: Direction[];
    abilities: PieceAbilities[];

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

    addAbility(ability: PieceAbilities) {
        if (!this.abilities.includes(ability))
            this.abilities.push(ability);
    }
}
