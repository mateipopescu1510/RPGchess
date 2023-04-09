enum KnightAbilities {
    TIME_TRAVEL // can attack back one move in time
}

class Knight extends Piece {
    constructor(level: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.L], this.range];
    }
}