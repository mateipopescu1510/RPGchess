enum Direction {
    LINE,
    DIAGONAL,
    L,
}

abstract class Piece {
    level: number;

    constructor(level: number) {
        this.level = level;
    }

    abstract moveset(): Direction;

}

class Rook extends Piece {
    constructor(level: number) {
        super(level);
    }

    moveset(): Direction {
        // Modific astfel incat sa returnez directia + range
        return Direction.LINE;
    }
}



class Board {
    ROWS: number;
    COLUMNS: number;
    boardSetup: Array<Piece>;


    constructor(rows: number, columns: number) {
        this.ROWS = rows;
        this.COLUMNS = columns;
        this.boardSetup = new Array<Piece>(this.ROWS * this.COLUMNS);
    }
}