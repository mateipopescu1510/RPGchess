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

        if (this.board.movePiece(from, to)) {
            this.currentTurn = 1 - this.currentTurn;
            return true;
        }
        return false;
    }

    takeback(): Boolean {
        let undoSuccessful: Boolean = this.board.undoMove();
        if (undoSuccessful) {
            this.currentTurn = 1 - this.currentTurn;
            return true;
        }
        return false;
    }

    printBoard() {
        //Only for testing
        this.board.printBoard();
    }
}

// var game = new GameState("8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", 0, -1, -1);
// console.log(game.movePiece([7, 6], [5, 5]));
// console.log(game.movePiece([0, 1], [2, 2]));
// console.log(game.movePiece([6, 3], [4, 3]));
// game.printBoard();

// console.log(game.takeback());
// game.printBoard();

// console.log(game.movePiece([0, 6], [2, 5]));
// game.printBoard();

// console.log(game.takeback());
// game.printBoard();

// console.log(game.movePiece([0, 6], [2, 5]));
// game.printBoard();


