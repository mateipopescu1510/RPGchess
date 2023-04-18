export const INFINITE_RANGE = -1;

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
    EMPTY = "#",
    PAWN = "p",
    BISHOP = "b",
    KNIGHT = "n",
    ROOK = "r",
    QUEEN = "q",
    KING = "k"
}

export enum PieceAbilities {
    //Generic abilities that any piece can have [100-199]
    SHIELD, //can take a hit

    //Pawn abilities [200-299]
    SCOUT, // can advance twice in one turn

    //Knight abilities [300-399]
    TIME_TRAVEL, // can attack back one move in time

    //Bishop abilities [400-499]
    SNIPER = 5, // can attack without moving
    CONVERT_ENEMY = 10, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX, // can change color complex, one time use

    //Rook abilities [500-599]
    TANK, // if two pieces are on the same line next to each other, they can both be captured

    //Queen abilities [600-699]
    BECOME_KING, //becomes piece of interest, king doesn't matter anymore

    //King abilities [700-799]
    SKIP, // can skip a turn
    FRIENDLY_FIRE, // can capture friendly pieces
    BLITZKRIEG, // pawns can advance twice at the beginning of the game
}

