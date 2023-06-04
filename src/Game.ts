import { Direction, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side, GameResult } from './enums';
import { oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';
import { GameState } from './GameState';

export class Game {
    private static gameIdCounter: number = 1000;
    private gameId: number;
    private whiteId: string;
    private blackId: string;
    private gameResult: GameResult;
    private gameState: GameState;

    constructor(whiteId: string, blackId: string, fen: string, pseudoLegal: boolean = false) {
        this.gameId = Game.gameIdCounter;
        Game.gameIdCounter++;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.gameState = new GameState(fen, 0, INFINITE_TIME, INFINITE_TIME, pseudoLegal);
        this.gameResult = GameResult.IN_PROGRESS;
    }

    getWhiteId(): string {
        return this.whiteId;
    }

    getBlackId(): string {
        return this.blackId;
    }

    getGameState(): GameState {
        return this.gameState;
    }
    

}