export const INFINITE_RANGE = -1;

export enum Direction {
    LINE,
    DIAGONAL,
    L,
    PAWN,
}

export enum PieceTypes {
    EMPTY,
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum PieceAbilities {
    SHIELD, //can take a hit
}

export enum PawnAbilites {
    SCOUT, // can advance twice in one turn
}

export enum KnightAbilities {
    TIME_TRAVEL // can attack back one move in time
}

export enum BishopAbilities {
    SNIPER = 5, // can attack without moving
    CONVERT_ENEMY = 10, // can turn an enemy piece into a friendly piece, one time use
    COLOR_COMPLEX, // can change color complex, one time use
}

export enum RookAbilities {
    TANK, // if two pieces are on the same line next to each other, they can both be captured
}

export enum QueenAbilities {
    BECOME_KING, //becomes piece of interest, king doesn't matter anymore
}

export enum KingAbilities {
    SKIP, // can skip a turn
    FRIENDLY_FIRE, // can capture friendly pieces
    BLITZKRIEG, // pawns can advance twice at the beginning of the game
}
