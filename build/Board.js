"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.stringToPiece = void 0;
var enums_1 = require("./enums");
var Piece_1 = require("./Piece");
function stringToPiece(piece) {
    for (var type in enums_1.PieceTypes) {
        if (enums_1.PieceTypes[type] === piece)
            return enums_1.PieceTypes[type];
    }
    return enums_1.PieceTypes.EMPTY;
}
exports.stringToPiece = stringToPiece;
var Board = /** @class */ (function () {
    function Board(fen) {
        this.fen = fen;
        this.whiteKingPosition = [-1, -1];
        this.blackKingPosition = [-1, -1];
        this.convertFen(fen);
        this.lastMove = [[-1, -1], [-1, -1], null, null];
    }
    //TODO add selectPiece() method? and highlight its possible moves
    Board.prototype.movePiece = function (_a, _b) {
        var fromRow = _a[0], fromColumn = _a[1];
        var toRow = _b[0], toColumn = _b[1];
        if (this.boardSetup[fromRow][fromColumn].getType() === enums_1.PieceTypes.EMPTY || !this.coordinateInList(this.validMoves([fromRow, fromColumn]), [toRow, toColumn]))
            return false; //Do nothing if an empty square is moved or if the destination isn't in the valid moves
        if (this.lastMove[0].toString() != [-1, -1].toString())
            //If there's a last move source square
            this.boardSetup[this.lastMove[0][0]][this.lastMove[0][1]].unhighlightPiece();
        if (this.lastMove[1].toString() != [-1, -1].toString())
            //If there's a last move destination square
            this.boardSetup[this.lastMove[1][0]][this.lastMove[1][1]].unhighlightPiece();
        this.lastMove[0] = [fromRow, fromColumn];
        this.lastMove[1] = [toRow, toColumn];
        this.lastMove[2] = this.boardSetup[fromRow][fromColumn];
        this.lastMove[3] = this.boardSetup[toRow][toColumn];
        this.boardSetup[toRow][toColumn] = this.boardSetup[fromRow][fromColumn]; //Move the piece to the new square
        this.boardSetup[toRow][toColumn].incrementMoveCounter();
        this.boardSetup[fromRow][fromColumn] = new Piece_1.Piece(); //Create a new empty square where the piece was previously
        if (this.boardSetup[toRow][toColumn].getType() === enums_1.PieceTypes.KING)
            this.boardSetup[toRow][toColumn].getSide() === enums_1.Side.WHITE ? this.whiteKingPosition = [toRow, toColumn] : this.blackKingPosition = [toRow, toColumn];
        //Highlight this move's source and destination squares
        this.boardSetup[fromRow][fromColumn].highlightPiece();
        this.boardSetup[toRow][toColumn].highlightPiece();
        this.updateFen();
        return true;
    };
    Board.prototype.undoMove = function () {
        var from = this.lastMove[0];
        var to = this.lastMove[1];
        var pieceMoved = this.lastMove[2];
        var targetPiece = this.lastMove[3];
        if (pieceMoved === null || targetPiece === null)
            return false;
        this.boardSetup[from[0]][from[1]] = pieceMoved;
        this.boardSetup[to[0]][to[1]] = targetPiece;
        return true;
    };
    Board.prototype.validMoves = function (_a) {
        var row = _a[0], column = _a[1];
        //Take every pseudolegal move and add it to the moves list if the king isn't in check after the move
        var pseudoLegalMoves = this.pseudoLegalMoves([row, column]);
        var moves = [];
        var side = this.boardSetup[row][column].getSide();
        var kingPosition = side === enums_1.Side.WHITE ? this.whiteKingPosition : this.blackKingPosition;
        var kingIsMoved = [row, column].toString() == kingPosition.toString();
        console.log(kingIsMoved);
        for (var _i = 0, pseudoLegalMoves_1 = pseudoLegalMoves; _i < pseudoLegalMoves_1.length; _i++) {
            var move = pseudoLegalMoves_1[_i];
            if (kingIsMoved && !this.kingInCheck(move, side, kingPosition, move)) {
                // console.log(this.kingInCheck(move, kingPosition));
                moves.push(move);
            }
            else if (!kingIsMoved && !this.kingInCheck(kingPosition, side, [row, column], move)) {
                moves.push(move);
            }
        }
        return moves;
    };
    Board.prototype.kingInCheck = function (kingPosition, side, from, to) {
        if (from === void 0) { from = [-1, -1]; }
        if (to === void 0) { to = [-1, -1]; }
        //Might seem repetitive, but starting from the king's position and looping over lines, diagonals, etc. seems
        //way better than finding every single enemy piece and seeing if the king's square is in its valid moves
        //Second and third arguments are for also seeing if a candidate move puts one's own king in check
        console.log("K:", kingPosition, side);
        if (this.checkFromDiagonals(kingPosition, side, from, to)) {
            console.log("diagonal check");
            return true;
        }
        if (this.checkFromLines(kingPosition, side, from, to)) {
            console.log("line check");
            return true;
        }
        if (this.checkFromKnight(kingPosition, side, from, to))
            return true;
        if (this.checkFromPawn(kingPosition, side, from, to))
            return true;
        console.log("no check");
        return false;
    };
    Board.prototype.checkFromLines = function (_a, side, _b, _c) {
        var row = _a[0], column = _a[1];
        var _d = _b === void 0 ? [-1, -1] : _b, fromRow = _d[0], fromColumn = _d[1];
        var _e = _c === void 0 ? [-1, -1] : _c, toRow = _e[0], toColumn = _e[1];
        for (var i = 1; row + i < this.ROWS; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row + i][column].getSide()) && (0, Piece_1.isQueenOrRook)(this.boardSetup[row + i][column])) {
                console.log([row + i, column]);
                return true;
            }
            if (row + i === fromRow && column === fromColumn)
                continue; //The piece moved from this square so it is treated as empty
            if (row + i === toRow && column === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row + i][column].getSide()))
                break;
        }
        for (var i = 1; row - i >= 0; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row - i][column].getSide()) && (0, Piece_1.isQueenOrRook)(this.boardSetup[row - i][column])) {
                console.log([row - i, column]);
                return true;
            }
            if (row - i === fromRow && column === fromColumn)
                continue;
            if (row - i === toRow && column === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row - i][column].getSide()))
                break;
            // if (oppositePiece(this.boardSetup[row][column], this.boardSetup[row - i][column]) && isQueenOrRook(this.boardSetup[row - i][column]))
            //     return true;
        }
        for (var i = 1; column + i < this.COLUMNS; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row][column + i].getSide()) && (0, Piece_1.isQueenOrRook)(this.boardSetup[row][column + i])) {
                console.log([row, column + i]);
                return true;
            }
            if (row === fromRow && column + i === fromColumn)
                continue;
            if (row === toRow && column + i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row][column + i].getSide()))
                break;
            // if (oppositePiece(this.boardSetup[row][column], this.boardSetup[row][column + i]) && isQueenOrRook(this.boardSetup[row][column + i]))
            //     return true;
        }
        for (var i = 1; column - i >= 0; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row][column - i].getSide()) && (0, Piece_1.isQueenOrRook)(this.boardSetup[row][column - i])) {
                console.log([row, column - i]);
                return true;
            }
            if (row === fromRow && column - i === fromColumn)
                continue;
            if (row === toRow && column - i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row][column - i].getSide()))
                break;
            // if (oppositePiece(this.boardSetup[row][column], this.boardSetup[row][column - i]) && isQueenOrRook(this.boardSetup[row][column - i]))
            //     return true;
        }
        return false;
    };
    Board.prototype.checkFromDiagonals = function (_a, side, _b, _c) {
        var row = _a[0], column = _a[1];
        var _d = _b === void 0 ? [-1, -1] : _b, fromRow = _d[0], fromColumn = _d[1];
        var _e = _c === void 0 ? [-1, -1] : _c, toRow = _e[0], toColumn = _e[1];
        for (var i = 1; row + i < this.ROWS && column + i < this.COLUMNS; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row + i][column + i].getSide()) && (0, Piece_1.isQueenOrBishop)(this.boardSetup[row + i][column + i]))
                return true;
            if (row + i === fromRow && column + i === fromColumn)
                continue;
            if (row + i === toRow && column + i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row + i][column + i].getSide()))
                break;
        }
        for (var i = 1; row - i >= 0 && column - i >= 0; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row - i][column - i].getSide()) && (0, Piece_1.isQueenOrBishop)(this.boardSetup[row - i][column - i]))
                return true;
            if (row - i === fromRow && column - i === fromColumn)
                continue;
            if (row - i === toRow && column - i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row - i][column - i].getSide()))
                break;
        }
        for (var i = 1; row + i < this.ROWS && column - i >= 0; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row + i][column - i].getSide()) && (0, Piece_1.isQueenOrBishop)(this.boardSetup[row + i][column - i]))
                return true;
            if (row + i === fromRow && column - i === fromColumn)
                continue;
            if (row + i === toRow && column - i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row + i][column - i].getSide()))
                break;
        }
        for (var i = 1; row - i >= 0 && column + i < this.COLUMNS; i++) {
            if ((0, Piece_1.oppositeSide)(side, this.boardSetup[row - i][column + i].getSide()) && (0, Piece_1.isQueenOrBishop)(this.boardSetup[row - i][column + i]))
                return true;
            if (row - i === fromRow && column + i === fromColumn)
                continue;
            if (row - i === toRow && column + i === toColumn || (0, Piece_1.sameSide)(side, this.boardSetup[row - i][column + i].getSide()))
                break;
        }
        return false;
    };
    Board.prototype.checkFromKnight = function (_a, side, _b, _c) {
        var row = _a[0], column = _a[1];
        var _d = _b === void 0 ? [-1, -1] : _b, fromRow = _d[0], fromColumn = _d[1];
        var _e = _c === void 0 ? [-1, -1] : _c, toRow = _e[0], toColumn = _e[1];
        var rowMinus2 = row - 2 >= 0;
        var rowMinus1 = row - 1 >= 0;
        var rowPlus2 = row + 2 < this.ROWS;
        var rowPlus1 = row + 1 < this.ROWS;
        var columnMinus2 = column - 2 >= 0;
        var columnMinus1 = column - 1 >= 0;
        var columnPlus2 = column + 2 < this.COLUMNS;
        var columnPlus1 = column + 1 < this.COLUMNS;
        if (rowMinus2 && columnMinus1 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 2][column - 1]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row - 2][column - 1]) && [toRow, toColumn].toString() != [row - 2, column - 1].toString())
            return true;
        if (rowMinus2 && columnPlus1 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 2][column + 1]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row - 2][column + 1]) && [toRow, toColumn].toString() != [row - 2, column + 1].toString())
            return true;
        if (rowMinus1 && columnPlus2 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column + 2]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row - 1][column + 2]) && [toRow, toColumn].toString() != [row - 1, column + 2].toString())
            return true;
        if (rowPlus1 && columnPlus2 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column + 2]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row + 1][column + 2]) && [toRow, toColumn].toString() != [row + 1, column + 2].toString())
            return true;
        if (rowPlus2 && columnPlus1 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 2][column + 1]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row + 2][column + 1]) && [toRow, toColumn].toString() != [row + 2, column + 1].toString())
            return true;
        if (rowPlus2 && columnMinus1 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 2][column - 1]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row + 2][column - 1]) && [toRow, toColumn].toString() != [row + 2, column - 1].toString())
            return true;
        if (rowPlus1 && columnMinus2 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column - 2]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row + 1][column - 2]) && [toRow, toColumn].toString() != [row + 1, column - 2].toString())
            return true;
        if (rowMinus1 && columnMinus2 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column - 2]) &&
            (0, Piece_1.isKnight)(this.boardSetup[row - 1][column - 2]) && [toRow, toColumn].toString() != [row - 1, column - 2].toString())
            return true;
        return false;
    };
    Board.prototype.checkFromPawn = function (_a, side, _b, _c) {
        var row = _a[0], column = _a[1];
        var _d = _b === void 0 ? [-1, -1] : _b, fromRow = _d[0], fromColumn = _d[1];
        var _e = _c === void 0 ? [-1, -1] : _c, toRow = _e[0], toColumn = _e[1];
        if (row > 0 && this.boardSetup[row][column].getSide() === enums_1.Side.WHITE) {
            if (column + 1 < this.ROWS && this.boardSetup[row - 1][column + 1].getType() === enums_1.PieceTypes.PAWN &&
                this.boardSetup[row - 1][column + 1].getSide() === enums_1.Side.BLACK && [toRow, toColumn].toString() != [row - 1, column + 1].toString())
                return true;
            if (column - 1 >= 0 && this.boardSetup[row - 1][column - 1].getType() === enums_1.PieceTypes.PAWN &&
                this.boardSetup[row - 1][column - 1].getSide() === enums_1.Side.BLACK && [toRow, toColumn].toString() != [row - 1, column - 1].toString())
                return true;
        }
        if (row < this.ROWS - 1 && this.boardSetup[row][column].getSide() === enums_1.Side.BLACK) {
            if (column + 1 < this.ROWS && this.boardSetup[row + 1][column + 1].getType() === enums_1.PieceTypes.PAWN &&
                this.boardSetup[row + 1][column + 1].getSide() === enums_1.Side.WHITE && [toRow, toColumn].toString() != [row + 1, column + 1].toString())
                return true;
            if (column - 1 >= 0 && this.boardSetup[row + 1][column - 1].getType() === enums_1.PieceTypes.PAWN &&
                this.boardSetup[row + 1][column - 1].getSide() === enums_1.Side.WHITE && [toRow, toColumn].toString() != [row + 1, column - 1].toString())
                return true;
        }
        return false;
    };
    Board.prototype.coordinateInList = function (list, coordinate) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var elem = list_1[_i];
            if (elem.toString() === coordinate.toString())
                return true;
        }
        return false;
    };
    Board.prototype.pseudoLegalMoves = function (_a) {
        var row = _a[0], column = _a[1];
        var moves = [];
        var directions = this.boardSetup[row][column].getDirections();
        var ranges = this.boardSetup[row][column].getRange();
        for (var index in directions) {
            //Do for every direction, for example, the king's directions are [LINE, DIAGONAL]. Every direction has a range associated, in this case, [1, 1].
            switch (directions[index]) {
                case enums_1.Direction.LINE: {
                    //Castling will be worked on later
                    /*if (this.boardSetup[row][column].getType() === PieceTypes.KING && this.boardSetup[row][column].getMoveCounter() === 0) {
                        //If the piece is a king and it hasn't moved yet, castling is available
                        //Find the leftmost and the rightmost rook (different boards may have more than two rooks)
                        let rook1: number = -1;
                        let rook2: number = -1;

                        for (let i = 0; i < this.COLUMNS; i++)
                            if (this.boardSetup[row][i].getType() === PieceTypes.ROOK)
                                if (rook1 === -1)
                                    rook1 = i;
                                else
                                    rook2 = i;
                                    
                        if (rook1 != -1 && this.boardSetup[row][rook1].getMoveCounter() === 0)
                            moves.push([row, rook1]); //If there is a leftmost rook, add its coordinates to the valid moves

                        if (rook2 != -1 && this.boardSetup[row][rook2].getMoveCounter() === 0)
                            moves.push([row, rook2]); //Same for the rightmost rook
                    }*/
                    //Check up, down, left, right with for loops
                    var range = ranges[index] === enums_1.INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index]; //Set the range to the size of the board if it's infinite
                    for (var i = 1; i <= range && row + i < this.ROWS; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break; //Stop checking in this direction if the target square is a piece of the same side (can't capture own pieces)
                        moves.push([row + i, column]); //Otherwise, add the coordinate to the move list
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break; //If the target square is an enemy piece, add it to the list but break off afterwards (can't capture through other pieces (for now))
                    }
                    for (var i = 1; i <= range && row - i >= 0; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column]))
                            break;
                        moves.push([row - i, column]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column]))
                            break;
                    }
                    for (var i = 1; i <= range && column + i < this.COLUMNS; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row][column + i]))
                            break;
                        moves.push([row, column + i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row][column + i]))
                            break;
                    }
                    for (var i = 1; i <= range && column - i >= 0; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row][column - i]))
                            break;
                        moves.push([row, column - i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row][column - i]))
                            break;
                    }
                    break;
                }
                case enums_1.Direction.DIAGONAL: {
                    //Same logic as with Direction.LINE, but diagonally
                    var range = ranges[index] === enums_1.INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index];
                    for (var i = 1; i <= range && row + i < this.ROWS && column + i < this.COLUMNS; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column + i]))
                            break;
                        moves.push([row + i, column + i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column + i]))
                            break;
                    }
                    for (var i = 1; i <= range && row - i >= 0 && column - i >= 0; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column - i]))
                            break;
                        moves.push([row - i, column - i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column - i]))
                            break;
                    }
                    for (var i = 1; i <= range && row + i < this.ROWS && column - i >= 0; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column - i]))
                            break;
                        moves.push([row + i, column - i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + i][column - i]))
                            break;
                    }
                    for (var i = 1; i <= range && row - i >= 0 && column + i < this.COLUMNS; i++) {
                        if ((0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column + i]))
                            break;
                        moves.push([row - i, column + i]);
                        if ((0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - i][column + i]))
                            break;
                    }
                    break;
                }
                case enums_1.Direction.PAWN: {
                    var side = this.boardSetup[row][column].getSide();
                    switch (side) {
                        case enums_1.Side.WHITE: {
                            if (row === 0)
                                break; //If it reached the last row
                            if (this.boardSetup[row - 1][column].getType() === enums_1.PieceTypes.EMPTY)
                                moves.push([row - 1, column]); //Move one square in front if empty
                            if (row === 6 && this.boardSetup[row - 2][column].getType() === enums_1.PieceTypes.EMPTY && this.boardSetup[row - 1][column].getType() === enums_1.PieceTypes.EMPTY)
                                moves.push([row - 2, column]); //Move two squares in front on the starting square
                            if (column - 1 >= 0 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column - 1]))
                                moves.push([row - 1, column - 1]); //Check capture left
                            if (column + 1 < this.COLUMNS && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column + 1]))
                                moves.push([row - 1, column + 1]); //Check capture right
                            break;
                        }
                        case enums_1.Side.BLACK: {
                            if (row == this.ROWS - 1)
                                break; //If it reached the last row
                            if (this.boardSetup[row + 1][column].getType() === enums_1.PieceTypes.EMPTY)
                                moves.push([row + 1, column]); //Move one square in front if empty
                            if (row === 1 && this.boardSetup[row + 2][column].getType() === enums_1.PieceTypes.EMPTY && this.boardSetup[row + 1][column].getType() === enums_1.PieceTypes.EMPTY)
                                moves.push([row + 2, column]); //Move two squares in front on the starting square
                            if (column - 1 >= 0 && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column - 1]))
                                moves.push([row + 1, column - 1]); //Check capture right
                            if (column + 1 < this.COLUMNS && (0, Piece_1.oppositePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column + 1]))
                                moves.push([row + 1, column + 1]); //Check capture left
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    break;
                }
                case enums_1.Direction.L: {
                    /*
                    .......
                    ..x.x..
                    .x...x.
                    ...N...
                    .x...x.
                    ..x.x..
                    .......
                    */
                    //A lot of booleans to make the if's a little easier 
                    var rowMinus2 = row - 2 >= 0;
                    var rowMinus1 = row - 1 >= 0;
                    var rowPlus2 = row + 2 < this.ROWS;
                    var rowPlus1 = row + 1 < this.ROWS;
                    var columnMinus2 = column - 2 >= 0;
                    var columnMinus1 = column - 1 >= 0;
                    var columnPlus2 = column + 2 < this.COLUMNS;
                    var columnPlus1 = column + 1 < this.COLUMNS;
                    //For every L direction, check if the target square is within bounds and if the target square isn't a friendly piece
                    if (rowMinus2 && columnMinus1 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - 2][column - 1]))
                        moves.push([row - 2, column - 1]);
                    if (rowMinus2 && columnPlus1 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - 2][column + 1]))
                        moves.push([row - 2, column + 1]);
                    if (rowMinus1 && columnPlus2 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column + 2]))
                        moves.push([row - 1, column + 2]);
                    if (rowPlus1 && columnPlus2 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column + 2]))
                        moves.push([row + 1, column + 2]);
                    if (rowPlus2 && columnPlus1 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + 2][column + 1]))
                        moves.push([row + 2, column + 1]);
                    if (rowPlus2 && columnMinus1 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + 2][column - 1]))
                        moves.push([row + 2, column - 1]);
                    if (rowPlus1 && columnMinus2 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row + 1][column - 2]))
                        moves.push([row + 1, column - 2]);
                    if (rowMinus1 && columnMinus2 && !(0, Piece_1.sameSidePiece)(this.boardSetup[row][column], this.boardSetup[row - 1][column - 2]))
                        moves.push([row - 1, column - 2]);
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return moves;
    };
    Board.prototype.convertFen = function (fen) {
        var _this = this;
        fen.split("/").forEach(function (value, index) {
            if (index == 0) {
                //Information about board size, still have to add information about castling rights
                var splitted = value.split(" ");
                _this.ROWS = Number(splitted[0]);
                _this.COLUMNS = Number(splitted[1]);
                _this.boardSetup = [];
                for (var i = 0; i < _this.ROWS; i++) {
                    _this.boardSetup[i] = [];
                    for (var j = 0; j < _this.ROWS; j++) {
                        _this.boardSetup[i][j] = new Piece_1.Piece();
                    }
                }
            }
            else {
                var splitted = value.split("");
                var idx = 0;
                for (var _i = 0, splitted_1 = splitted; _i < splitted_1.length; _i++) {
                    var elem = splitted_1[_i];
                    var piece = stringToPiece(elem.toLowerCase()); //Convert the character to a piece type
                    if (!(piece === enums_1.PieceTypes.EMPTY)) {
                        var side = (elem === elem.toLowerCase() ? enums_1.Side.BLACK : enums_1.Side.WHITE);
                        _this.boardSetup[index - 1][idx] = new Piece_1.Piece(piece, side, [index - 1, idx]); //Third argument is the piece's initial square
                        switch (piece) {
                            //Set the directions and ranges for each piece type (currently only for the base chess game)
                            case enums_1.PieceTypes.KING: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.LINE, enums_1.Direction.DIAGONAL]);
                                _this.boardSetup[index - 1][idx].setRange([1, 1]);
                                side === enums_1.Side.WHITE ? _this.whiteKingPosition = [index - 1, idx] : _this.blackKingPosition = [index - 1, idx];
                                break;
                            }
                            case enums_1.PieceTypes.QUEEN: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.LINE, enums_1.Direction.DIAGONAL]);
                                _this.boardSetup[index - 1][idx].setRange([enums_1.INFINITE_RANGE, enums_1.INFINITE_RANGE]);
                                break;
                            }
                            case enums_1.PieceTypes.BISHOP: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.DIAGONAL]);
                                _this.boardSetup[index - 1][idx].setRange([enums_1.INFINITE_RANGE]);
                                break;
                            }
                            case enums_1.PieceTypes.ROOK: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.LINE]);
                                _this.boardSetup[index - 1][idx].setRange([enums_1.INFINITE_RANGE]);
                                break;
                            }
                            case enums_1.PieceTypes.KNIGHT: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.L]);
                                _this.boardSetup[index - 1][idx].setRange([1]);
                                break;
                            }
                            case enums_1.PieceTypes.PAWN: {
                                _this.boardSetup[index - 1][idx].setDirections([enums_1.Direction.PAWN]);
                                _this.boardSetup[index - 1][idx].setRange([1]);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        idx++;
                    }
                    else {
                        //If it gets to this else, it means it found a number which represents that many empty squares, so skip ahead by that many slots
                        idx += Number(elem);
                    }
                }
            }
        });
    };
    Board.prototype.updateFen = function () {
        var _this = this;
        var newFen = "";
        this.fen.split("/").forEach(function (value, index) {
            //index - 1 because the first row starts at 0 and the first index, 0, represents information about the board size, etc.
            if (index - 1 != _this.lastMove[0][0] && index - 1 != _this.lastMove[1][0])
                //lastMove can be used. By knowing the rows from which the piece left and then landed, all the other rows can just be copied without any changes
                newFen += value + "/";
            else {
                for (var _i = 0, _a = _this.boardSetup[index - 1]; _i < _a.length; _i++) {
                    var piece = _a[_i];
                    if (piece.getType() != enums_1.PieceTypes.EMPTY)
                        newFen += piece.getSide() === enums_1.Side.WHITE ? piece.getType().toUpperCase() : piece.getType();
                    //Add the found piece in uppercase if it's a white piece, otherwise lowercase
                    else {
                        //If it gets here, an empty square was found
                        if (isNaN(Number(newFen.slice(-1)))) //If the last character represents a piece
                            newFen += "1"; //Add a 1 to represent the empty square
                        else {
                            //Otherwise it means there is another empty square to the left, so that number gets incrememnted
                            var next = (Number(newFen.slice(-1)) + 1).toString();
                            newFen = newFen.slice(0, -1) + next;
                        }
                    }
                }
                newFen += "/";
            }
        });
        this.fen = newFen.slice(0, -1);
    };
    Board.prototype.getFen = function () {
        return this.fen;
    };
    Board.prototype.getBoard = function () {
        return this.boardSetup;
    };
    Board.prototype.getRows = function () {
        return this.ROWS;
    };
    Board.prototype.getColumns = function () {
        return this.COLUMNS;
    };
    Board.prototype.getLastMove = function () {
        return this.lastMove;
    };
    Board.prototype.getWhiteKingPosition = function () {
        return this.whiteKingPosition;
    };
    Board.prototype.getBlackKingPosition = function () {
        return this.blackKingPosition;
    };
    Board.prototype.printBoard = function () {
        //only for testing
        for (var _i = 0, _a = this.boardSetup; _i < _a.length; _i++) {
            var row = _a[_i];
            var rowString = "";
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var piece = row_1[_b];
                rowString += piece.getSide() === enums_1.Side.WHITE ? piece.getType().toString().toUpperCase() + " " : piece.getType().toString() + " ";
            }
            console.log(rowString);
        }
    };
    Board.prototype.printValidSquares = function (_a) {
        var row = _a[0], column = _a[1];
        //only for testing
        var board = "";
        var moves = this.validMoves([row, column]);
        for (var i = 0; i < this.ROWS; i++) {
            var rowString = "";
            for (var j = 0; j < this.COLUMNS; j++) {
                if ([i, j].toString() == [row, column].toString())
                    rowString += "@ ";
                else
                    rowString += this.coordinateInList(moves, [i, j]) ? "x " : ". ";
            }
            board += rowString + "\n";
        }
        console.log(board);
    };
    return Board;
}());
exports.Board = Board;
//"8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
//"8 8/r[102500501510]n[300]6/w" -> fen notation concept for when abilities get implemented (each ability is a 3 digit number)
//"8 8/n5P1/2p2r2/1P6/5k2/2QB4/1q6/1PP5/8"
// var board: Board = new Board("8 8/rnbqk1nr/pppp1ppp/4p3/1b1P4/5N2/PPP1PPPP/RNBQKB1R/8");
// board.printBoard();
// console.log("Current FEN:", board.getFen());
// console.log("White king position:", board.getWhiteKingPosition());
// console.log("White king in check?:", board.kingInCheck(board.getWhiteKingPosition()));
// for (let i = 0; i < 8; i++)
//     for (let j = 0; j < 8; j++)
//         if (board.getBoard()[i][j].getSide() === Side.WHITE && board.validMoves([i, j]).length > 0)
//             console.log([i, j], "->", board.validMoves([i, j]));
// console.log(board.validMoves([4, 1]));
// console.log(board.movePiece([4, 1], [6, 3]));
// board.printBoard();
// console.log(board.undoMove());
// board.printBoard();
// board.printValidSquares([6, 4]);
