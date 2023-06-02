export const INFINITE_RANGE = -1;
export const INFINITE_TIME = -1;
export enum GameResult {
    BLACK_WIN = -1,
    DRAW = 0,
    WHITE_WIN = 1,
    IN_PROGRESS = 2
}

export enum Direction {
    LINE = "LINE",
    DIAGONAL = "DIAGONAL",
    L = "L",
    PAWN = "PAWN",
}

export enum Side {
    WHITE = "WHITE",
    BLACK = "BLACK",
    NONE = "NONE"
}

export enum PieceTypes {
    EMPTY = ".",
    PAWN = "p",
    BISHOP = "b",
    KNIGHT = "n",
    ROOK = "r",
    QUEEN = "q",
    KING = "k"
}

export enum PieceAbilities {
    //Generic abilities that any piece can have [100-199]
    SHIELD = 100, //can take a hit

    //Pawn abilities [200-299]
    SCOUT = 200, // can advance twice in one turn

    //Knight abilities [300-399]
    TIME_TRAVEL = 300, // can attack back one move in time
    SMOLDERING = 301, //freezes enemy queen for a move

    //Bishop abilities [400-499]
    SNIPER = 400, // can attack without moving
    CONVERT_ENEMY = 401, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX = 402, // can change color complex, one time use

    //Rook abilities [500-599]
    TANK = 500, // if two pieces are on the same line next to each other, they can both be captured

    //Queen abilities [600-699]
    BECOME_KING = 600, //becomes piece of interest, king doesn't matter anymore

    //King abilities [700-799]
    SKIP = 700, // can skip a turn
    FRIENDLY_FIRE = 701, // can capture friendly pieces
    BLITZKRIEG = 702, // pawns can advance twice at the beginning of the game
    CASTLING = 703,
}


