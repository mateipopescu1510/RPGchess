enum RookAbilities {
    TANK, // if two pieces are on the same line next to each other, they can both be captured
}

class Rook extends Piece {
    constructor(level: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.LINE], this.range];
    }
}