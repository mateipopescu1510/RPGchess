import { Direction, INFINITE_RANGE, PieceTypes, Side } from './Enums';
import { oppositeSide, Piece, sameSide } from './Piece'

function stringToPiece(piece: string): PieceTypes {
    for (let type in PieceTypes) {
        if (PieceTypes[type] === piece)
            return PieceTypes[type];
    }
    return PieceTypes.EMPTY;
}

class Board {
    private fen: String;
    private ROWS: number;
    private COLUMNS: number;
    private boardSetup: Piece[][];
    private lastMove: [[number, number], [number, number], Piece | null, Piece | null]; //[from, to, piece that was moved, what it landed on]


    constructor(fen: String) {
        this.convertFen(fen);
        this.lastMove = [[-1, -1], [-1, -1], null, null];
    }

    movePiece(fromLine: number, fromColumn: number, toLine: number, toColumn: number): Boolean {
        if (this.boardSetup[fromLine][fromColumn].getType() === PieceTypes.EMPTY)
            return false;

        return true;
    }


    validMoves(row: number, column: number): Array<[number, number]> {
        let moves: Array<[number, number]> = [];
        let directions: Direction[] = this.boardSetup[row][column].getDirections();
        let ranges: number[] = this.boardSetup[row][column].getRange();

        for (let index in directions) {
            switch (directions[index]) {

                case Direction.LINE: {
                    let range: number = ranges[index] === INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index];
                    for (let i = 1; i <= range && row + i < this.ROWS; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break;
                        moves.push([row + i, column]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break;
                    }

                    for (let i = 1; i <= range && row - i >= 0; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row - i][column]))
                            break;
                        moves.push([row - i, column]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row - i][column]))
                            break;
                    }

                    for (let i = 1; i <= range && column + i < this.COLUMNS; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row][column + i]))
                            break;
                        moves.push([row, column + i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row][column + i]))
                            break;
                    }

                    for (let i = 1; i <= range && column - i >= 0; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row][column - i]))
                            break;
                        moves.push([row, column - i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row][column - i]))
                            break;
                    }

                    break;
                }

                case Direction.DIAGONAL: {
                    let range: number = ranges[index] === INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index];
                    for (let i = 1; i <= range && row + i < this.ROWS && column + i < this.COLUMNS; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row + i][column + i]))
                            break;
                        moves.push([row + i, column + i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row + i][column + i]))
                            break;
                    }

                    for (let i = 1; i <= range && row - i >= 0 && column - i >= 0; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row - i][column - i]))
                            break;
                        moves.push([row - i, column - i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row - i][column + i]))
                            break;
                    }

                    for (let i = 1; i <= range && row + i < this.ROWS && column - i >= 0; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row + i][column - i]))
                            break;
                        moves.push([row + i, column - i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row + i][column - i]))
                            break;
                    }

                    for (let i = 1; i <= range && row + i >= 0 && column + i < this.COLUMNS; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row - i][column + i]))
                            break;
                        moves.push([row - i, column + i]);
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row - i][column + i]))
                            break;
                    }

                    break;
                }

                case Direction.PAWN: {
                    let side: Side = this.boardSetup[row][column].getSide();
                    switch (side) {
                        case Side.WHITE: {
                            if (this.boardSetup[row - 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row - 1, column]); //move one square in front if empty

                            if (row === 6 && this.boardSetup[row - 2][column].getType() === PieceTypes.EMPTY && this.boardSetup[row - 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row - 2, column]); //move two squares in front on the starting square

                            if (column - 1 >= 0 && oppositeSide(this.boardSetup[row][column], this.boardSetup[row - 1][column - 1]))
                                moves.push([row - 1, column - 1]); //check capture left

                            if (column + 1 < this.COLUMNS && oppositeSide(this.boardSetup[row][column], this.boardSetup[row - 1][column + 1]))
                                moves.push([row - 1, column + 1]); //check capture right

                            break;
                        }
                        case Side.BLACK: {
                            if (this.boardSetup[row + 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row + 1, column]); //move one square in front if empty

                            if (row === 1 && this.boardSetup[row + 2][column].getType() === PieceTypes.EMPTY && this.boardSetup[row + 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row + 2, column]); //move two squares in front on the starting square

                            if (column - 1 >= 0 && oppositeSide(this.boardSetup[row][column], this.boardSetup[row + 1][column - 1]))
                                moves.push([row + 1, column - 1]); //check capture right

                            if (column + 1 < this.COLUMNS && oppositeSide(this.boardSetup[row][column], this.boardSetup[row + 1][column + 1]))
                                moves.push([row + 1, column + 1]); //check capture left

                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    break;
                }

                case Direction.L: {
                    /*
                    .......
                    ..x.x..
                    .x...x.
                    ...N...
                    .x...x.
                    ..x.x..
                    .......
                    */
                    let rowMinus2 = row - 2 >= 0;
                    let rowMinus1 = row - 1 >= 0;
                    let rowPlus2 = row + 2 < this.ROWS;
                    let rowPlus1 = row + 1 < this.ROWS;

                    let columnMinus2 = column - 2 >= 0;
                    let columnMinus1 = column - 1 >= 0;
                    let columnPlus2 = column + 2 < this.COLUMNS;
                    let columnPlus1 = column + 1 < this.COLUMNS;

                    if (rowMinus2 && columnMinus1 && !sameSide(this.boardSetup[row][column], this.boardSetup[row - 2][column - 1]))
                        moves.push([row - 2, column - 1]);

                    if (rowMinus2 && columnPlus1 && !sameSide(this.boardSetup[row][column], this.boardSetup[row - 2][column + 1]))
                        moves.push([row - 2, column + 1]);

                    if (rowMinus1 && columnPlus2 && !sameSide(this.boardSetup[row][column], this.boardSetup[row - 1][column + 2]))
                        moves.push([row - 1, column + 2]);

                    if (rowPlus1 && columnPlus2 && !sameSide(this.boardSetup[row][column], this.boardSetup[row + 1][column + 2]))
                        moves.push([row + 1, column + 2]);

                    if (rowPlus2 && columnPlus1 && !sameSide(this.boardSetup[row][column], this.boardSetup[row + 2][column + 1]))
                        moves.push([row + 2, column + 1]);

                    if (rowPlus2 && columnMinus1 && !sameSide(this.boardSetup[row][column], this.boardSetup[row + 2][column - 1]))
                        moves.push([row + 2, column - 1]);

                    if (rowPlus1 && columnMinus2 && !sameSide(this.boardSetup[row][column], this.boardSetup[row + 1][column - 2]))
                        moves.push([row + 1, column - 2]);

                    if (rowMinus1 && columnMinus2 && !sameSide(this.boardSetup[row][column], this.boardSetup[row - 1][column - 2]))
                        moves.push([row - 1, column - 2]);

                    break;
                }

                default: {
                    break;
                }
            }
        }
        return moves;
    }//make private after done with testing




    convertFen(fen: String) {
        fen.split("/").forEach((value, index) => {
            if (index == 0) {
                // information about board size, still have to add information about castling rights
                let splitted = value.split(" ");
                this.ROWS = Number(splitted[0]);
                this.COLUMNS = Number(splitted[1]);

                this.boardSetup = [];
                for (let i = 0; i < this.ROWS; i++) {
                    this.boardSetup[i] = [];
                    for (let j = 0; j < this.ROWS; j++) {
                        this.boardSetup[i][j] = new Piece();
                    }
                }
            }
            else {
                let splitted = value.split("");
                let idx = 0;
                for (let elem of splitted) {
                    // console.log(elem);
                    let piece: PieceTypes = stringToPiece(elem.toLowerCase()); // convert the character to a piece type
                    // console.log(piece);
                    if (!(piece === PieceTypes.EMPTY)) {
                        // console.log(index - 1, idx);
                        let side: Side = (elem === elem.toLowerCase() ? Side.BLACK : Side.WHITE);

                        this.boardSetup[index - 1][idx] = new Piece(piece, side, 0, 0, [], [], []);

                        switch (piece) {
                            case PieceTypes.KING: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.LINE, Direction.DIAGONAL]);
                                this.boardSetup[index - 1][idx].setRange([1, 1]);
                                break;
                            }
                            case PieceTypes.QUEEN: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.LINE, Direction.DIAGONAL]);
                                this.boardSetup[index - 1][idx].setRange([INFINITE_RANGE, INFINITE_RANGE]);
                                break;
                            }
                            case PieceTypes.BISHOP: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.DIAGONAL]);
                                this.boardSetup[index - 1][idx].setRange([INFINITE_RANGE]);
                                break;
                            }
                            case PieceTypes.ROOK: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.LINE]);
                                this.boardSetup[index - 1][idx].setRange([INFINITE_RANGE]);
                                break;
                            }
                            case PieceTypes.KNIGHT: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.L]);
                                this.boardSetup[index - 1][idx].setRange([1]);
                                break;
                            }
                            case PieceTypes.PAWN: {
                                this.boardSetup[index - 1][idx].setDirections([Direction.PAWN]);
                                this.boardSetup[index - 1][idx].setRange([1]);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        idx++;
                    }
                    else {
                        idx += Number(elem); // number of empty squares, nothing to change
                    }
                }

            }
        })
    }

    getFen(): string {
        return ""; //TODO
    }

    getBoard(): Piece[][] {
        return this.boardSetup;
    }

    getRows(): number {
        return this.ROWS;
    }

    getColumns(): number {
        return this.COLUMNS;
    }

    //"8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    //"8 8/r[102500501510]n[300]6/w"

}

var board: Board = new Board("8 8/n7/2p2r2/1P6/5k2/2QB4/1q6/1PP5/8");


// for (let p of board.getBoard()[1]) {
//     console.log(p.getType(), p.getSide(), p.getDirections(), p.getRange());
// }

console.log(board.validMoves(0, 0));
console.log(board.validMoves(1, 2));
console.log(board.validMoves(2, 1));
console.log(board.validMoves(1, 5));
console.log(board.validMoves(4, 3));
console.log(board.validMoves(6, 1));
console.log(board.validMoves(6, 2));



