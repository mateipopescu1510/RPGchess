import { Direction, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side } from './enums.js';
import { oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';


export class GameState {
    private board: Board;
    private currentTurn: number; //0 for white, 1 for black
    private timeWhite: number;
    private timeBlack: number;

    constructor(fen: string, currentTurn: number, timeWhite: number, timeBlack: number) {
        this.board = new Board(fen);
        this.currentTurn = currentTurn;
        this.timeWhite = timeWhite;
        this.timeBlack = timeBlack;
    }
} 