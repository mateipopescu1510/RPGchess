import { Direction, GameResult, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side } from './enums.js';
import { oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';


export class GameState {
    board: Board;
    private currentTurn: number; //0 for white, 1 for black
    private timeWhite: number;
    private timeBlack: number;
    private gameResult: GameResult;

    constructor(fen: string, currentTurn: number, timeWhite: number, timeBlack: number, pseudoLegal: Boolean = false) {
        this.board = new Board(fen, pseudoLegal);
        this.currentTurn = currentTurn;
        this.timeWhite = timeWhite;
        this.timeBlack = timeBlack;
        this.gameResult = GameResult.IN_PROGRESS;
    }

    movePiece(from: [number, number], to: [number, number]): Boolean {
        if (this.gameResult != GameResult.IN_PROGRESS)
            return false;

        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.WHITE && this.currentTurn === 0)
            return false;
        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.BLACK && this.currentTurn === 1)
            return false;

        if (this.board.movePiece(from, to)) {
            this.currentTurn = 1 - this.currentTurn;
            if (this.stalemate())
                this.gameResult = GameResult.DRAW;

            if (this.checkmate())
                this.gameResult = this.currentTurn === 0 ? GameResult.BLACK_WIN : GameResult.WHITE_WIN;

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

    checkmate(): Boolean {
        if (this.board.pseudoLegalGame()) {
            // If game is set to pseudolegal, checkmate is when the enemy king is captured
            let lastCaptured = this.board.getLastMove()[1];
            if (this.currentTurn === 1 && lastCaptured.toString() === this.board.getBlackKingPosition().toString())
                return true;

            if (this.currentTurn === 0 && lastCaptured.toString() === this.board.getWhiteKingPosition().toString())
                return true;

            return false;
        }
        // If game is set to not pseudolegal, checkmate is when the king is in check and has no valid moves

        if (this.currentTurn === 0 &&
            this.board.kingInCheck(this.board.getWhiteKingPosition(), Side.WHITE) &&
            !this.board.sideHasLegalMoves(Side.WHITE))
            return true;

        if (this.currentTurn === 1 &&
            this.board.kingInCheck(this.board.getBlackKingPosition(), Side.BLACK) &&
            !this.board.sideHasLegalMoves(Side.BLACK))
            return true;

        return false;
    }

    stalemate(): Boolean {
        // Stalemate can only happen in a game with legal moves enforced
        if (this.currentTurn === 0 &&
            !this.board.sideHasLegalMoves(Side.WHITE))
            return true;

        if (this.currentTurn === 1 &&
            !this.board.sideHasLegalMoves(Side.BLACK))
            return true;

        return false;
    }

    getGameResult(): GameResult {
        return this.gameResult;
    }

    printBoard() {
        //Only for testing
        this.board.printBoard();
    }
}

// var board: GameState = new GameState("8 8/kr6/8/8/8/8/7p/7P/6BK", 1, -1, -1);

// board.printBoard();
// console.log("white valid moves:");
// board.board.printAllValidMoves(Side.WHITE);
// console.log("stalemate", board.stalemate());
// console.log("checkmate", board.checkmate());
// console.log("gameResult", board.getGameResult());

// console.log(board.movePiece([0, 1], [7, 1]));

// board.printBoard();
// console.log("white valid moves:");
// board.board.printAllValidMoves(Side.WHITE);
// console.log("stalemate", board.stalemate());
// console.log("checkmate", board.checkmate());
// console.log("gameResult", board.getGameResult());

// console.log(board.movePiece([7, 6], [6, 5]));
// board.printBoard();
