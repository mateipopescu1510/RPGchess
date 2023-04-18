import { PieceTypes, Side } from './Enums';
import { Piece } from './Piece'

function stringToPiece(piece: string): PieceTypes {
    for (let type in PieceTypes) {
        if (PieceTypes[type] === piece)
            return PieceTypes[type];
    }
    return PieceTypes.EMPTY;
}

class Board {
    fen: String
    ROWS: number;
    COLUMNS: number;
    boardSetup: Piece[][];
    lastMove: [number, number, Piece, Piece];


    constructor(fen: String) {
        this.convertFen(fen);

        // this.boardSetup = new Array<Piece[]>(this.ROWS).fill([]).map(() => new Array<Piece>(this.COLUMNS));

    }

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
                        this.boardSetup[index - 1][idx].setType(piece); //[index - 1] because the first element of the FEN has data about board size, castling rights, etc 
                        this.boardSetup[index - 1][idx].setSide((elem === elem.toLowerCase() ? Side.BLACK : Side.WHITE)); // k == lower(k) => black king; K != lower(K) => white king
                        idx++;
                    }
                    else {
                        idx += Number(elem); // number of empty squares, nothing to change
                    }
                }

            }
        })
    }


    //"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    //"8 8/r[102500501510]n[300]6/w"

}

var board: Board = new Board("8 8/4k1R1/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");


for (let p of board.boardSetup[0]) {
    console.log(p.getType(), p.getSide());
}



