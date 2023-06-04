import { Direction, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side } from './enums.js';
import { oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';


export class GameState {
    private board: Board;
    private currentTurn: number; //0 for white, 1 for black
    private timeWhite: number;
    private timeBlack: number;

    constructor(fen: string, currentTurn: number, timeWhite: number, timeBlack: number, pseudoLegal: Boolean = false) {
        this.board = new Board(fen, pseudoLegal);
        this.currentTurn = currentTurn;
        this.timeWhite = timeWhite;
        this.timeBlack = timeBlack;
    }

    movePiece(from: [number, number], to: [number, number]): Boolean {
        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.WHITE && this.currentTurn === 0)
            return false;
        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.BLACK && this.currentTurn === 1)
            return false;

        let moveSuccessful: Boolean = this.board.movePiece(from, to);
        return moveSuccessful;
    }

    getTurn(): number {
        return this.currentTurn;
    }



} 