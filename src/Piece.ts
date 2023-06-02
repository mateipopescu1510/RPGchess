import { INFINITE_RANGE, Direction, Side, PieceTypes, PieceAbilities } from "./enums";

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
    return side1 === Side.WHITE && side2 === Side.BLACK ||
        side1 === Side.BLACK && side2 === Side.WHITE;
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

    setDirections(directions: Direction[]) {
        this.directions = directions;
    }

    getDirections(): Direction[] {
        return this.directions;
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

    getXP(): number {
        return this.currentXP;
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


    // addAbility(ability: PieceAbilities) {
    // if (!this.abilities.includes(ability))
    // this.abilities.push(ability);
    // }
}
