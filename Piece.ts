import { INFINITE_RANGE, Direction, PieceTypes, PieceAbilities, PawnAbilites, KnightAbilities, BishopAbilities, RookAbilities, QueenAbilities, KingAbilities } from "./enums";

export class Piece {
    type: PieceTypes;
    level: number;
    currentXP: number;
    range: number[];
    //abilities: ?

    constructor(type: PieceTypes, level: number = 1, currentXP: number = 0, range: number[] = [1]) {
        this.type = type;
        this.level = level;
        this.currentXP = currentXP;
        this.range = range;
    }


}
