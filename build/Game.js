"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var enums_1 = require("./enums");
var GameState_1 = require("./GameState");
var Game = exports.Game = /** @class */ (function () {
    function Game(whiteId, blackId, fen) {
        this.gameId = Game.gameIdCounter;
        Game.gameIdCounter++;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.gameState = new GameState_1.GameState(fen, 0, enums_1.INFINITE_TIME, enums_1.INFINITE_TIME);
        this.gameResult = enums_1.GameResult.IN_PROGRESS;
    }
    Game.gameIdCounter = 1000;
    return Game;
}());
