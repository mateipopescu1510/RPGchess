enum QueenAbilities {
    BECOME_KING, //becomes piece of interest, king doesn't matter anymore
}

class Queen extends Piece {
    constructor(level: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.LINE, Direction.DIAGONAL], this.range];
    }
}