enum KingAbilities {
    SKIP, // can skip a turn
    FRIENDLY_FIRE, // can capture friendly pieces
    BLITZKRIEG, // pawns can advance twice at the beginning of the game
}

class King extends Piece {
    constructor(level: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.LINE, Direction.DIAGONAL], this.range];
    }
}