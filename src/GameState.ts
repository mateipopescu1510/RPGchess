import { Direction, GameResult, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side, PieceAbilities, LEVEL_UP_XP } from './enums.js';
import { oppositeSide, Piece, sameSide } from './Piece'
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

            if (!this.board.pseudoLegalGame() && this.stalemate())
                this.gameResult = GameResult.DRAW;

            if (this.checkmate())
                this.gameResult = this.currentTurn === 0 ? GameResult.BLACK_WIN : GameResult.WHITE_WIN;

            return true;
        }
        return false;
    }

    levelUp(ability: string): Boolean {
        let coordinate = this.board.pieceMustLevelUp();
        if (coordinate === false)
            return false;

        let row: number = coordinate[0];
        let column: number = coordinate[1];

        let level: number = this.board.getBoard()[row][column].getLevel();
        let currentXP: number = this.board.getBoard()[row][column].getCurrentXP();

        if (PieceAbilities[ability] === PieceAbilities.NONE) {
            this.board.getBoard()[row][column].setXP(currentXP - LEVEL_UP_XP[level]);
            this.board.getBoard()[row][column].setLevel(level + 1);
            this.board.levelUpDone();
            return true;
        }

        if (this.board.getBoard()[row][column].possibleAbilities().indexOf(PieceAbilities[ability]) === -1)
            return false;

        if (this.board.getBoard()[row][column].addAbility(PieceAbilities[ability])) {
            this.board.getBoard()[row][column].setXP(currentXP - LEVEL_UP_XP[level]);
            this.board.getBoard()[row][column].setLevel(level + 1);
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
// var board: GameState = new GameState("8 8/q2k2r1/8/8/8/8/3K4/8/8", 1, -1, -1);
// board.printBoard();
// console.log();
// board.getBoard().printValidSquares([5, 3]);

// console.log(board.movePiece([0, 0], [3, 3]));

// board.printBoard();
// console.log();
// board.getBoard().printValidSquares([5, 3]);

