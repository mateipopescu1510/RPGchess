"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = exports.isKing = exports.isPawn = exports.isKnight = exports.isQueenOrBishop = exports.isQueenOrRook = exports.sameSide = exports.sameSidePiece = exports.oppositeSide = exports.oppositePiece = void 0;
var enums_1 = require("./enums");
function oppositePiece(piece1, piece2) {
    return piece1.getSide() === enums_1.Side.WHITE && piece2.getSide() === enums_1.Side.BLACK ||
        piece1.getSide() === enums_1.Side.BLACK && piece2.getSide() === enums_1.Side.WHITE;
}
exports.oppositePiece = oppositePiece;
function oppositeSide(side1, side2) {
    return side1 === enums_1.Side.WHITE && side2 === enums_1.Side.BLACK ||
        side1 === enums_1.Side.BLACK && side2 === enums_1.Side.WHITE;
}
exports.oppositeSide = oppositeSide;
function sameSidePiece(piece1, piece2) {
    return piece1.getSide() === enums_1.Side.WHITE && piece2.getSide() === enums_1.Side.WHITE ||
        piece1.getSide() === enums_1.Side.BLACK && piece2.getSide() === enums_1.Side.BLACK;
}
exports.sameSidePiece = sameSidePiece;
function sameSide(side1, side2) {
    return side1 === enums_1.Side.WHITE && side2 === enums_1.Side.BLACK ||
        side1 === enums_1.Side.BLACK && side2 === enums_1.Side.WHITE;
}
exports.sameSide = sameSide;
function isQueenOrRook(piece) {
    return piece.getType() === enums_1.PieceTypes.QUEEN || piece.getType() === enums_1.PieceTypes.ROOK;
}
exports.isQueenOrRook = isQueenOrRook;
function isQueenOrBishop(piece) {
    return piece.getType() === enums_1.PieceTypes.QUEEN || piece.getType() === enums_1.PieceTypes.BISHOP;
}
exports.isQueenOrBishop = isQueenOrBishop;
function isKnight(piece) {
    return piece.getType() === enums_1.PieceTypes.KNIGHT;
}
exports.isKnight = isKnight;
function isPawn(piece) {
    return piece.getType() === enums_1.PieceTypes.PAWN;
}
exports.isPawn = isPawn;
function isKing(piece) {
    return piece.getType() === enums_1.PieceTypes.KING;
}
exports.isKing = isKing;
var Piece = /** @class */ (function () {
    function Piece(type, side, initialSquare, level, currentXP, range, directions, abilities) {
        if (type === void 0) { type = enums_1.PieceTypes.EMPTY; }
        if (side === void 0) { side = enums_1.Side.NONE; }
        if (initialSquare === void 0) { initialSquare = [-1, -1]; }
        if (level === void 0) { level = 0; }
        if (currentXP === void 0) { currentXP = 0; }
        if (range === void 0) { range = [0]; }
        if (directions === void 0) { directions = []; }
        if (abilities === void 0) { abilities = []; }
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
    Piece.prototype.setDirections = function (directions) {
        this.directions = directions;
    };
    Piece.prototype.getDirections = function () {
        return this.directions;
    };
    Piece.prototype.setRange = function (range) {
        this.range = range;
    };
    Piece.prototype.getRange = function () {
        return this.range;
    };
    Piece.prototype.setLevel = function (level) {
        this.level = level;
    };
    Piece.prototype.getLevel = function () {
        return this.level;
    };
    Piece.prototype.setXP = function (xp) {
        this.currentXP = xp;
    };
    Piece.prototype.getXP = function () {
        return this.currentXP;
    };
    Piece.prototype.setType = function (type) {
        this.type = type;
    };
    Piece.prototype.getType = function () {
        return this.type;
    };
    Piece.prototype.setSide = function (side) {
        this.side = side;
    };
    Piece.prototype.getSide = function () {
        return this.side;
    };
    Piece.prototype.incrementMoveCounter = function () {
        this.moveCounter++;
    };
    Piece.prototype.setMoveCounter = function (moveCounter) {
        this.moveCounter = moveCounter;
    };
    Piece.prototype.getMoveCounter = function () {
        return this.moveCounter;
    };
    Piece.prototype.highlightPiece = function () {
        this.highlighted = true;
    };
    Piece.prototype.unhighlightPiece = function () {
        this.highlighted = false;
    };
    Piece.prototype.getHighlight = function () {
        return this.highlighted;
    };
    Piece.prototype.getInitialSquare = function () {
        return this.initialSquare;
    };
    return Piece;
}());
exports.Piece = Piece;
