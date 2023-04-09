import { Piece } from './Piece'

class Board {
    fen: String
    ROWS: number;
    COLUMNS: number;
    boardSetup: Array<Piece>;


    constructor(fen: String) {
        // convert from fen
        this.boardSetup = new Array<Piece>(this.ROWS * this.COLUMNS);
    }


    //"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    //"{8 8}/r[4a.3]n[2.1]6/.../.../..."

}