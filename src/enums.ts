export const INFINITE_RANGE: number = 255;
export const INFINITE_TIME: number = -1;
export const LEVEL_UP_XP: number[] = [10, 12, 15, 17, 19, 20, 22, 24, 25, 27, 29, 30, 32, 35, 40, 45, 50, 55, 60, 66, 72, 80];
export const CAPTURE_MULTIPLIER: number = 0.5;
export const PER_MOVE_XP: number = 5;

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
    CAMEL = "CAMEL",
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
    // The commented abilities are ideas for the future
    // Maybe make it so if a piece levels up, the chosen ability could be applied to another piece of the same type?
    // Make variant where you choose 2 or 3 abilities at the beginning of the game
    // Add abilities that influence the clock

    //TODO Make it so pieces start with 2 ability slots, which can increase with the INCREASE_CAPACITY ability
    //TODO Move XP multiplier and capture multiplier inside Piece class and make it variable
    //TODO Make certain abilities mutually exclusive 


    //Generic abilities that any piece can have [100-199]
    NONE = -1, // in case player chooses not to apply a new ability
    // SHIELD = 100, // can take a hit, one time use
    // ONE_TIME_SNIPE = 101, 
    // JUMP = 102, // leap over a friendly piece (in the piece's own direction type) and land adjacent to it, one time use
    // ONE_TURN_IMMORTALITY = 103,
    // REMOVE_ABILITY = 104, // removes an ability of a chosen enemy piece, one time use
    // INCREASE_CAPACITY = 105, // add an ability slot to the piece
    // INCREASE_XP_MULTIPLIER = 106, // increase XP multiplier for the piece by 0.1
    // INCREASE_CAPTURE_MULTIPLIER = 107, // increase capture multiplier for the piece by 0.1
    // ANCHOR = 199, // disability, nerfs the the range of the piece to 2 squares for 3 turns

    //Pawn abilities [200-299]
    SCOUT = 200, // can advance twice in one turn
    // GUARD = 201, // moves like a rook (one square range), captures like a bishop (one square range) 
    // LONG_SWORD = 202, // can capture diagonally 2 squares
    QUANTUM_TUNNELING = 203, // can move through an enemy pawn (only through a pawn) behind it if the square is empty
    // BACKWARDS = 204, // can move backwards one square
    // set so it alternates between movesets?

    //Knight abilities [300-399]
    // TIME_TRAVEL = 300, // can attack back one move in time, one time use
    SMOLDERING = 301, // freezes enemy queen for a move
    CAMEL = 302, // can also move like a camel (3 steps in one direction and 1 to the side, long knight)
    // LEAPER = 303, // normal L shape jump has range = 2

    //Bishop abilities [400-499]
    // SNIPER = 400, // can attack diagonally without moving, but can only move one square diagonally
    // CONVERT_ENEMY = 401, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX = 402, // can change color complex by moving one sqaure to the side, can't capture to the side, make it one time use
    ARCHBISHOP = 403, // can also move like a knight

    //Rook abilities [500-599]
    // TANK = 500, // if two pieces are on the same line next to each other, they can both be captured
    HAS_PAWN = 501, // has a pawn that can guard its front left and right
    CHANCELLOR = 502, // can also move like a knight
    // IMMOBILIZER = 503, // rook becomes invincible, but can no longer capture. All adjacent enemy pieces are frozen until the rook moves away 

    //Queen abilities [600-699]
    // BECOME_KING = 600, // becomes piece of interest, king doesn't matter anymore
    SWEEPER = 601, // can also move like a knight but lines and diagonals have reduced range
    // CUPIDS_ARROW = 602, // can freeze the enemy king for one move, one time use
    // INTIMIDATION = 603, // choose an enemy piece that the queen intimidates, nerfing its range

    //King abilities [700-799]
    SKIP = 700, // can skip a turn by moving on its own square
    // FRIENDLY_FIRE = 701, // can capture friendly pieces, only once
    ON_HORSE = 702, // can also move like a knight
    // AIR_STRIKE = 703, // bomb a 2x2 area anywhere on the board except where the enemy king is, one time use
    // CASTLING = 704,
    ON_CAMEL = 705,

    // Add disabilities? Negatively effect an enemy piece?
}


