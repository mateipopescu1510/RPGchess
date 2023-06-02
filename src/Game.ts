import { Direction, INFINITE_RANGE, INFINITE_TIME, PieceTypes, Side, GameResult } from './enums';
import { oppositeSide, Piece, sameSide } from './Piece'
import { Board, stringToPiece } from './Board';
import { GameState } from './GameState';

export class Game {
    private static gameIdCounter: number = 1000;
    private gameId: number;
    private whiteId: number;
    private blackId: number;
    private gameResult: GameResult;
    private gameState: GameState;

    constructor(whiteId: number, blackId: number, fen: string) {
        this.gameId = Game.gameIdCounter;
        Game.gameIdCounter++;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.gameState = new GameState(fen, 0, INFINITE_TIME, INFINITE_TIME);
        this.gameResult = GameResult.IN_PROGRESS;
    }
}