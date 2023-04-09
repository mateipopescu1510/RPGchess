enum BishopAbilities {
    SNIPER = 5, // can attack without moving
    CONVERT_ENEMY = 10, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX, // can change color complex, one time use
}

class Bishop extends Piece {
    constructor(level: number, currentXP: number, range: number[]) {
        super(level, range);
    }

    moveset(): [Direction[], number[]] {
        return [[Direction.DIAGONAL], this.range];
    }
}