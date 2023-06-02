"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
var Board_1 = require("./Board");
var GameState = /** @class */ (function () {
    function GameState(fen, currentTurn, timeWhite, timeBlack) {
        this.board = new Board_1.Board(fen);
        this.currentTurn = currentTurn;
        this.timeWhite = timeWhite;
        this.timeBlack = timeBlack;
    }
    return GameState;
}());
exports.GameState = GameState;
