const infiniteRange = -1;

enum Direction {
    LINE,
    DIAGONAL,
    L,
    PAWN,
}

enum PieceAbilities {
    SHIELD, //can take a hit
}

abstract class Piece {
    level: number;
    //currentXP: number;
    range: number[];

    constructor(level: number = 1, range: number[] = [0]) {
        this.level = level;
        //this.currentXP = currentXP;
        this.range = range;
    }

    abstract moveset(): [Direction[], number[]];
}