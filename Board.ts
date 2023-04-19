import { Direction, INFINITE_RANGE, PieceTypes, Side } from './Enums';
import { Piece } from './Piece'

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


    validMoves(line: number, column: number): Array<[number, number]> {
        let moves: Array<[number, number]> = [];
        let directions: Direction[] = this.boardSetup[line][column].getDirections();
        let ranges: number[] = this.boardSetup[line][column].getRange();

        for (let index in directions) {
            switch (directions[index]) {
                case Direction.LINE: {
                    let range: number = ranges[index] === INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index];
                    for (let i = 1; i <= range; i++) {
                        if (line + i < this.ROWS)
                            moves.push([line + i, column]);

                        if (line - i >= 0)
                            moves.push([line - i, column]);

                        if (column + i < this.COLUMNS)
                            moves.push([line, column + i]);

                        if (column - i >= 0)
                            moves.push([line, column - i]);
                    }
                    break;
                }
                case Direction.DIAGONAL: {
                    let range: number = ranges[index] === INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index];
                    for (let i = 1; i <= range; i++) {
                        if (line + i < this.ROWS && column + i < this.COLUMNS)
                            moves.push([line + i, column + i]);

                        if (line - i >= 0 && column - i >= 0)
                            moves.push([line - i, column - i]);

                        if (line + i < this.ROWS && column - i >= 0)
                            moves.push([line + i, column - i]);

                        if (line - i >= 0 && column + i < this.COLUMNS)
                            moves.push([line - i, column + i]);
                    }
                    break;
                }
                case Direction.PAWN: {
                    let side: Side = this.boardSetup[line][column].getSide();
                    switch (side) {
                        case Side.WHITE: {
                            if (this.boardSetup[line - 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([line - 1, column]);

                            if (line === 6 && this.boardSetup[line - 2][column].getType() === PieceTypes.EMPTY)
                                moves.push([line - 2, column]);


                            if (!(this.boardSetup[line - 1][column - 1].getType() === PieceTypes.EMPTY))
                                moves.push([line - 1, column - 1]);

                            if (!(this.boardSetup[line - 1][column + 1].getType() === PieceTypes.EMPTY))
                                moves.push([line - 1, column + 1]);
                            break;
                        }
                        case Side.BLACK: {
                            if (this.boardSetup[line + 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([line + 1, column]);

                            if (line === 6 && this.boardSetup[line + 2][column].getType() === PieceTypes.EMPTY) {
                                moves.push([line + 2, column]);
                            }

                            if (!(this.boardSetup[line + 1][column - 1].getType() === PieceTypes.EMPTY))
                                moves.push([line + 1, column - 1]);

                            if (!(this.boardSetup[line + 1][column + 1].getType() === PieceTypes.EMPTY))
                                moves.push([line + 1, column + 1]);
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
                    let lineMinus2 = line - 2 >= 0;
                    let lineMinus1 = line - 1 >= 0;
                    let linePlus2 = line + 2 < this.ROWS;
                    let linePlus1 = line + 1 < this.ROWS;

                    let columnMinus2 = column - 2 >= 0;
                    let columnMinus1 = column - 1 >= 0;
                    let columnPlus2 = column + 2 < this.COLUMNS;
                    let columnPlus1 = column + 1 < this.COLUMNS;

                    if (lineMinus2 && columnMinus1)
                        moves.push([line - 2, column - 1]);
                    if (lineMinus2 && columnPlus1)
                        moves.push([line - 2, column + 1]);
                    if (lineMinus1 && columnPlus2)
                        moves.push([line - 1, column + 2]);
                    if (linePlus1 && columnPlus2)
                        moves.push([line + 1, column + 2]);
                    if (linePlus2 && columnPlus1)
                        moves.push([line + 2, column + 1]);
                    if (linePlus2 && columnMinus1)
                        moves.push([line + 2, column - 1]);
                    if (linePlus1 && columnMinus2)
                        moves.push([line + 1, column - 2]);
                    if (lineMinus1 && columnMinus2)
                        moves.push([line - 1, column - 2]);
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
        return "";
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

var board: Board = new Board("8 8/1N6/8/8/4k3/8/8/8/8");


for (let p of board.getBoard()[3]) {
    console.log(p.getType(), p.getSide(), p.getDirections(), p.getRange());
}

console.log(board.validMoves(0, 1));



