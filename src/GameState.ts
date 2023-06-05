import { Direction, GameResult, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side, PieceAbilities } from './enums.js';
import { abilitesForPiece, oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';


export class GameState {
    private board: Board;
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

        if (this.board.pieceMustLevelUp())
            return false;

        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.WHITE && this.currentTurn === 0)
            return false;

        if (this.board.getBoard()[from[0]][from[1]].getSide() != Side.BLACK && this.currentTurn === 1)
            return false;

        if (this.board.movePiece(from, to)) {
            this.changeTurn();
            if (this.stalemate())
                this.gameResult = GameResult.DRAW;

            if (this.checkmate())
                this.gameResult = this.currentTurn === 0 ? GameResult.BLACK_WIN : GameResult.WHITE_WIN;

            return true;
        }
        return false;
    }

    levelUp(ability: PieceAbilities): Boolean {
        let coordinate = this.board.pieceMustLevelUp();
        if (coordinate === false)
            return false;

        let row: number = coordinate[0];
        let column: number = coordinate[1];

        if (abilitesForPiece(this.board.getBoard()[row][column]).indexOf(ability) === -1)
            return false;
        if (this.board.getBoard()[row][column].addAbility(ability)) {
            this.board.levelUpDone();
            this.board.updateFen();
            return true;
        }
        return false;
    }

    getTurn(): number {
        return this.currentTurn;
    }

    takeback(): Boolean {
        let undoSuccessful: Boolean = this.board.undoMove();
        if (undoSuccessful) {
            this.changeTurn();
            return true;
        }
        return false;
    }

    checkmate(): Boolean {
        let lastCaptured = this.board.getLastMove()[1];
        if (this.currentTurn === 1 && lastCaptured.toString() === this.board.getBlackKingPosition().toString())
            return true;

        if (this.currentTurn === 0 && lastCaptured.toString() === this.board.getWhiteKingPosition().toString())
            return true;

        if (this.board.pseudoLegalGame())
            return false;
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

    getBoard(): Board {
        return this.board;
    }

    changeTurn() {
        this.currentTurn = 1 - this.currentTurn;
    }
}

// var board: GameState = new GameState("5 12/k9K[100700]1/5R[500]2q[605]3/12/12/12", 0, INFINITE_TIME, INFINITE_TIME);
// board.printBoard();
// console.log(board.getBoard().getFen());
// console.log(board.movePiece([0, 10], [0, 11]));
// board.printBoard();
// console.log(board.getBoard().getFen());

// console.log(board.movePiece([1, 8], [4, 5]));
// board.printBoard();
// console.log(board.getBoard().getFen());

// console.log(board.movePiece([1, 5], [4, 5]));
// board.printBoard();
// console.log(board.getBoard().getFen());


