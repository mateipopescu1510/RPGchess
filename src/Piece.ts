import { INFINITE_RANGE, Direction, Side, PieceTypes, PieceAbilities, LEVEL_UP_XP, PER_MOVE_XP, CAPTURE_MULTIPLIER } from "./enums";

export class Piece {
    private type: PieceTypes;
    private side: Side;
    private initialSquare: [number, number];
    private level: number;
    private currentXP: number;
    private range: number[];
    private directions: Direction[];
    private abilities: PieceAbilities[];
    private moveCounter: number;
    private highlighted: Boolean;

    constructor(type: PieceTypes = PieceTypes.EMPTY, side: Side = Side.NONE,
        initialSquare: [number, number] = [-1, -1],
        level: number = 0, currentXP: number = 0,
        range: number[] = [0], directions: Direction[] = [],
        abilities: PieceAbilities[] = []) {

        this.type = type;
        this.side = side;
        this.initialSquare = initialSquare;
        this.level = level;
        this.currentXP = currentXP;
        this.range = range;
        this.directions = directions;
        this.abilities = abilities;
        this.moveCounter = 0;
        this.highlighted = false;
    }

    addXP(capturedPieceXP: number): Boolean {
        this.currentXP += PER_MOVE_XP;
        this.currentXP += Math.floor(CAPTURE_MULTIPLIER * capturedPieceXP);

        return LEVEL_UP_XP[this.level] <= this.currentXP;
    }

    addAbility(ability: PieceAbilities): Boolean {
        if (this.abilities.indexOf(ability) != -1)
            return false;

        this.abilities.push(ability);
        return true;
    }

    setDirections(directions: Direction[]) {
        this.directions = directions;
    }

    getDirections(): Direction[] {
        return this.directions;
    }

    setAbilities(pieceAbilities: PieceAbilities[]) {
        this.abilities = pieceAbilities;
    }

    getAbilities(): PieceAbilities[] {
        return this.abilities;
    }

    setRange(range: number[]) {
        this.range = range;
    }

    getRange(): number[] {
        return this.range;
    }

    setLevel(level: number) {
        this.level = level;
    }

    getLevel(): number {
        return this.level;
    }

    setXP(xp: number) {
        this.currentXP = xp;
    }

    getCurrentXP(): number {
        return this.currentXP;
    }

    getTotalXP(): number {
        let totalXP: number = this.currentXP;
        for (let lvl = 0; lvl < this.level; lvl++)
            totalXP += LEVEL_UP_XP[lvl];
        return totalXP;
    }

    setType(type: PieceTypes) {
        this.type = type;
    }

    getType(): PieceTypes {
        return this.type;
    }

    setSide(side: Side) {
        this.side = side;
    }

    getSide(): Side {
        return this.side;
    }

    incrementMoveCounter() {
        this.moveCounter++;
    }

    setMoveCounter(moveCounter: number) {
        this.moveCounter = moveCounter;
    }

    getMoveCounter(): number {
        return this.moveCounter;
    }

    highlightPiece() {
        this.highlighted = true;
    }

    unhighlightPiece() {
        this.highlighted = false;
    }

    getHighlight(): Boolean {
        return this.highlighted;
    }

    getInitialSquare(): [number, number] {
        return this.initialSquare;
    }

}

export function abilitesForPiece(piece: Piece): PieceAbilities[] {
    if (piece.getType() === PieceTypes.EMPTY)
        return [];

    let keys = Object.values(PieceAbilities).filter((v) => !isNaN(Number(v)));
    let possibleAbilities: PieceAbilities[] = [PieceAbilities.NONE];
    let pieceAbilities = piece.getAbilities();

    for (let key of keys)
        if (Number(key) >= 100 && Number(key) < 200)
            possibleAbilities.push(Number(key));

    let pieceMultiplier: number = 1;
    let type = piece.getType();
    if (type === PieceTypes.PAWN)
        pieceMultiplier = 2;
    if (type === PieceTypes.KNIGHT)
        pieceMultiplier = 3;
    if (type === PieceTypes.BISHOP)
        pieceMultiplier = 4;
    if (type === PieceTypes.ROOK)
        pieceMultiplier = 5;
    if (type === PieceTypes.QUEEN)
        pieceMultiplier = 6;
    if (type === PieceTypes.KING)
        pieceMultiplier = 7;

    for (let key of keys)
        if (Number(key) >= pieceMultiplier * 100 && Number(key) < (pieceMultiplier + 1) * 100)
            possibleAbilities.push(Number(key));

    for (let ability of pieceAbilities)
        possibleAbilities = possibleAbilities.filter((v) => v !== ability);

    return possibleAbilities;
}

export function oppositePiece(piece1: Piece, piece2: Piece): Boolean {
    return piece1.getSide() === Side.WHITE && piece2.getSide() === Side.BLACK ||
        piece1.getSide() === Side.BLACK && piece2.getSide() === Side.WHITE

}

export function oppositeSide(side1: Side, side2: Side): Boolean {
    return side1 === Side.WHITE && side2 === Side.BLACK ||
        side1 === Side.BLACK && side2 === Side.WHITE;
}

export function sameSidePiece(piece1: Piece, piece2: Piece): Boolean {
    return piece1.getSide() === Side.WHITE && piece2.getSide() === Side.WHITE ||
        piece1.getSide() === Side.BLACK && piece2.getSide() === Side.BLACK;
}

export function sameSide(side1: Side, side2: Side) {
    return side1 === Side.WHITE && side2 === Side.WHITE ||
        side1 === Side.BLACK && side2 === Side.BLACK;
}

export function isQueenOrRook(piece: Piece): Boolean {
    return piece.getType() === PieceTypes.QUEEN || piece.getType() === PieceTypes.ROOK;
}

export function isQueenOrBishop(piece: Piece): Boolean {
    return piece.getType() === PieceTypes.QUEEN || piece.getType() === PieceTypes.BISHOP;
}

export function isKnight(piece: Piece): Boolean {
    return piece.getType() === PieceTypes.KNIGHT;
}

export function isPawn(piece: Piece): Boolean {
    return piece.getType() === PieceTypes.PAWN;
}

export function isKing(piece: Piece) {
    return piece.getType() === PieceTypes.KING;
}
