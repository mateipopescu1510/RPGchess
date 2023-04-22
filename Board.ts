import { Direction, INFINITE_RANGE, PieceTypes, Side } from './Enums';
import { oppositeSide, Piece, sameSide } from './Piece'

export function stringToPiece(piece: string): PieceTypes {
    for (let type in PieceTypes) {
        if (PieceTypes[type] === piece)
            return PieceTypes[type];
    }
    return PieceTypes.EMPTY;
}

export class Board {
    private fen: string;
    private ROWS: number;
    private COLUMNS: number;
    private boardSetup: Piece[][];
    private lastMove: [[number, number], [number, number], Piece | null, Piece | null]; //[from, to, piece that was moved, what it landed on]

    constructor(fen: string) {
        this.fen = fen;
        this.convertFen(fen);
        this.lastMove = [[-1, -1], [-1, -1], null, null];
    }

    movePiece([fromRow, fromColumn]: [number, number], [toRow, toColumn]: [number, number]): Boolean {
        if (this.boardSetup[fromRow][fromColumn].getType() === PieceTypes.EMPTY || !this.coordinateInList(this.validMoves([fromRow, fromColumn]), [toRow, toColumn]))
            return false; //Do nothing if an empty square is moved or if the destination isn't in the valid moves

        //TODO check if a move made by a king is castling

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
        this.boardSetup[fromRow][fromColumn] = new Piece(); //Create a new empty square where the piece was previously

        //Highlight this move's source and destination squares
        this.boardSetup[fromRow][fromColumn].highlightPiece();
        this.boardSetup[toRow][toColumn].highlightPiece();

        this.updateFen();

        return true;
    }

    private coordinateInList(list: Array<[number, number]>, coordinate: [number, number]): Boolean {
        for (let elem of list)
            if (elem.toString() === coordinate.toString())
                return true;
        return false;
    }

    private validMoves([row, column]: [number, number]): Array<[number, number]> {
        let moves: Array<[number, number]> = [];
        let directions: Direction[] = this.boardSetup[row][column].getDirections();
        let ranges: number[] = this.boardSetup[row][column].getRange();

        for (let index in directions) {
            //Do for every direction, for example, the king's directions are [LINE, DIAGONAL]. Every direction has a range associated, in this case, [1, 1].
            switch (directions[index]) {

                case Direction.LINE: {
                    if (this.boardSetup[row][column].getType() === PieceTypes.KING && this.boardSetup[row][column].getMoveCounter() === 0) {
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
                        //TODO for these two if's, also check if the squares between the king and rook are empty 
                        if (rook1 != -1 && this.boardSetup[row][rook1].getMoveCounter() === 0)
                            moves.push([row, rook1]); //If there is a leftmost rook, add its coordinates to the valid moves

                        if (rook2 != -1 && this.boardSetup[row][rook2].getMoveCounter() === 0)
                            moves.push([row, rook2]); //Same for the rightmost rook
                    }

                    //Check up, down, left, right with for loops
                    let range: number = ranges[index] === INFINITE_RANGE ? Math.max(this.ROWS, this.COLUMNS) : ranges[index]; //Set the range to the size of the board if it's infinite
                    for (let i = 1; i <= range && row + i < this.ROWS; i++) {
                        if (sameSide(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break; //Stop checking in this direction if the target square is a piece of the same side (can't capture own pieces)
                        moves.push([row + i, column]); //Otherwise, add the coordinate to the move list
                        if (oppositeSide(this.boardSetup[row][column], this.boardSetup[row + i][column]))
                            break; //If the target square is an enemy piece, add it to the list but break off afterwards (can't capture through other pieces (for now))
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
                    //Same logic as with Direction.LINE, but diagonally
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
                            if (row === 0)
                                break; //If it reached the last row

                            if (this.boardSetup[row - 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row - 1, column]); //Move one square in front if empty

                            if (row === 6 && this.boardSetup[row - 2][column].getType() === PieceTypes.EMPTY && this.boardSetup[row - 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row - 2, column]); //Move two squares in front on the starting square

                            if (column - 1 >= 0 && oppositeSide(this.boardSetup[row][column], this.boardSetup[row - 1][column - 1]))
                                moves.push([row - 1, column - 1]); //Check capture left

                            if (column + 1 < this.COLUMNS && oppositeSide(this.boardSetup[row][column], this.boardSetup[row - 1][column + 1]))
                                moves.push([row - 1, column + 1]); //Check capture right

                            break;
                        }
                        case Side.BLACK: {
                            if (row == this.ROWS - 1)
                                break; //If it reached the last row

                            if (this.boardSetup[row + 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row + 1, column]); //Move one square in front if empty

                            if (row === 1 && this.boardSetup[row + 2][column].getType() === PieceTypes.EMPTY && this.boardSetup[row + 1][column].getType() === PieceTypes.EMPTY)
                                moves.push([row + 2, column]); //Move two squares in front on the starting square

                            if (column - 1 >= 0 && oppositeSide(this.boardSetup[row][column], this.boardSetup[row + 1][column - 1]))
                                moves.push([row + 1, column - 1]); //Check capture right

                            if (column + 1 < this.COLUMNS && oppositeSide(this.boardSetup[row][column], this.boardSetup[row + 1][column + 1]))
                                moves.push([row + 1, column + 1]); //Check capture left

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

                    //A lot of booleans to make the if's a little easier 
                    let rowMinus2 = row - 2 >= 0;
                    let rowMinus1 = row - 1 >= 0;
                    let rowPlus2 = row + 2 < this.ROWS;
                    let rowPlus1 = row + 1 < this.ROWS;

                    let columnMinus2 = column - 2 >= 0;
                    let columnMinus1 = column - 1 >= 0;
                    let columnPlus2 = column + 2 < this.COLUMNS;
                    let columnPlus1 = column + 1 < this.COLUMNS;

                    //For every L direction, check if the target square is within bounds and if the target square isn't a friendly piece
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
    }

    private convertFen(fen: string) {
        fen.split("/").forEach((value, index) => {
            if (index == 0) {
                //Information about board size, still have to add information about castling rights
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
                    let piece: PieceTypes = stringToPiece(elem.toLowerCase()); //Convert the character to a piece type
                    if (!(piece === PieceTypes.EMPTY)) {
                        let side: Side = (elem === elem.toLowerCase() ? Side.BLACK : Side.WHITE);

                        this.boardSetup[index - 1][idx] = new Piece(piece, side);

                        switch (piece) {
                            //Set the directions and ranges for each piece type (currently only for the base chess game)
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
                        //If it gets to this else, it means it found a number which represents that many empty squares, so skip ahead by that many slots
                        idx += Number(elem);
                    }
                }

            }
        })
    }

    private updateFen() {
        let newFen: string = "";
        this.fen.split("/").forEach((value, index) => {
            //index - 1 because the first row starts at 0 and the first index, 0, represents information about the board size, etc.
            if (index - 1 != this.lastMove[0][0] && index - 1 != this.lastMove[1][0])
                //lastMove can be used. By knowing the rows from which the piece left and then landed, all the other rows can just be copied without any changes
                newFen += value + "/";
            else {
                for (let piece of this.boardSetup[index - 1]) {
                    if (piece.getType() != PieceTypes.EMPTY)
                        newFen += piece.getSide() === Side.WHITE ? piece.getType().toUpperCase() : piece.getType();
                    //Add the found piece in uppercase if it's a white piece, otherwise lowercase
                    else {
                        //If it gets here, an empty square was found
                        if (isNaN(Number(newFen.slice(-1)))) //If the last character represents a piece
                            newFen += "1"; //Add a 1 to represent the empty square
                        else {
                            //Otherwise it means there is another empty square to the left, so that number gets incrememnted
                            let next: string = (Number(newFen.slice(-1)) + 1).toString();
                            newFen = newFen.slice(0, -1) + next;
                        }
                    }
                }
                newFen += "/";
            }
        })
        this.fen = newFen.slice(0, -1);
    }

    getFen(): string {
        return this.fen;
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

    getLastMove(): [[number, number], [number, number], Piece | null, Piece | null] {
        return this.lastMove;
    }

    printBoard() {
        //only for testing
        for (let row of this.boardSetup) {
            let rowString: string = "";
            for (let piece of row)
                rowString += piece.getSide() === Side.WHITE ? piece.getType().toString().toUpperCase() + " " : piece.getType().toString() + " ";
            console.log(rowString);
        }
    }
}

//"8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
//"8 8/r[102500501510]n[300]6/w" -> fen notation concept for when abilities get implemented (each ability is a 3 digit number)
//"8 8/n5P1/2p2r2/1P6/5k2/2QB4/1q6/1PP5/8"

var board: Board = new Board("8 8/n5P1/2p2rr1/1P6/5k2/2QB4/1q6/1PP5/8");

board.printBoard();
console.log(board.getFen());
console.log(board.getLastMove());

console.log(board.movePiece([4, 3], [1, 6]));
board.printBoard();
console.log(board.getFen());
console.log(board.getLastMove());


