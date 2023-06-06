export const INFINITE_RANGE: number = -1;
export const INFINITE_TIME: number = -1;
export const LEVEL_UP_XP: number[] = [10, 12, 15, 19, 22, 26, 30, 35, 42, 50];
export const CAPTURE_MULTIPLIER: number = 0.3;
export const PER_MOVE_XP: number = 1;

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
    NONE = -1,
    //Generic abilities that any piece can have [100-199]
    // SHIELD = 100, //can take a hit

    //Pawn abilities [200-299]
    SCOUT = 200, // can advance twice in one turn
    //ELITE = 201, // can also move like a knight
    //LONG_SWORD = 202, // can capture diagonally 2 squares
    //set so it alternates between movesets?

    //Knight abilities [300-399]
    // TIME_TRAVEL = 300, // can attack back one move in time
    SMOLDERING = 301, //freezes enemy queen for a move

    //Bishop abilities [400-499]
    // SNIPER = 400, // can attack diagonally without moving, but can only move one square diagonally
    // CONVERT_ENEMY = 401, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX = 402, // can change color complex by moving one sqaure to the side

    //Rook abilities [500-599]
    // TANK = 500, // if two pieces are on the same line next to each other, they can both be captured
    HAS_PAWN = 501, // has a pawn that can guard its front left and right
    // RADAR = 502, // can see through enemy pieces
    // RAY_GUN = 503, // can attack and capture entire line (not through friendly pieces), but self-destructs after

    //Queen abilities [600-699]
    // BECOME_KING = 600, //becomes piece of interest, king doesn't matter anymore
    SHORT_AMAZON = 601, //can also move like a knight but lines and diagonals have reduced range

    //King abilities [700-799]
    SKIP = 700, // can skip a turn
    // FRIENDLY_FIRE = 701, // can capture friendly pieces
    ON_HORSE = 702, //can also move like a knight
    // CASTLING = 703
}


