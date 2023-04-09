import { infiniteRange, Direction, PieceTypes, PieceAbilities, PawnAbilites, KnightAbilities, BishopAbilities, RookAbilities, QueenAbilities, KingAbilities } from "./enums";

export abstract class Piece {
    type: PieceTypes;
    level: number;
    currentXP: number;
    range: number[];

    constructor(type: PieceTypes, level: number = 1, currentXP: number = 0, range: number[] = [infiniteRange]) {
        this.type = type;
        this.level = level;
        this.currentXP = currentXP;
        this.range = range;
    }

    abstract moveset(): [Direction[], number[]];
}
