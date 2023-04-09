import { Piece } from './Piece'

class Board {
    fen: String
    ROWS: number;
    COLUMNS: number;
    boardSetup: Array<Piece>;
    lastMove: [number, number, Piece, Piece];


    constructor(fen: String) {
        // convert from fen
        this.boardSetup = new Array<Piece>(this.ROWS * this.COLUMNS);
    }


    //"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    //"/r[102500501510]n[300]6/.../.../..." w

}