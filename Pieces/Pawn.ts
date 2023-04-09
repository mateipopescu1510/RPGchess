enum PawnAbilites {
    SCOUT, // can advance twice in one turn
}

class Pawn extends Piece {
    constructor(level: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.PAWN], this.range];
    }
}