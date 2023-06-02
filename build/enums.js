"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieceAbilities = exports.PieceTypes = exports.Side = exports.Direction = exports.GameResult = exports.INFINITE_TIME = exports.INFINITE_RANGE = void 0;
exports.INFINITE_RANGE = -1;
exports.INFINITE_TIME = -1;
var GameResult;
(function (GameResult) {
    GameResult[GameResult["BLACK_WIN"] = -1] = "BLACK_WIN";
    GameResult[GameResult["DRAW"] = 0] = "DRAW";
    GameResult[GameResult["WHITE_WIN"] = 1] = "WHITE_WIN";
    GameResult[GameResult["IN_PROGRESS"] = 2] = "IN_PROGRESS";
})(GameResult = exports.GameResult || (exports.GameResult = {}));
var Direction;
(function (Direction) {
    Direction["LINE"] = "LINE";
    Direction["DIAGONAL"] = "DIAGONAL";
    Direction["L"] = "L";
    Direction["PAWN"] = "PAWN";
})(Direction = exports.Direction || (exports.Direction = {}));
var Side;
(function (Side) {
    Side["WHITE"] = "WHITE";
    Side["BLACK"] = "BLACK";
    Side["NONE"] = "NONE";
})(Side = exports.Side || (exports.Side = {}));
var PieceTypes;
(function (PieceTypes) {
    PieceTypes["EMPTY"] = ".";
    PieceTypes["PAWN"] = "p";
    PieceTypes["BISHOP"] = "b";
    PieceTypes["KNIGHT"] = "n";
    PieceTypes["ROOK"] = "r";
    PieceTypes["QUEEN"] = "q";
    PieceTypes["KING"] = "k";
})(PieceTypes = exports.PieceTypes || (exports.PieceTypes = {}));
var PieceAbilities;
(function (PieceAbilities) {
    //Generic abilities that any piece can have [100-199]
    PieceAbilities[PieceAbilities["SHIELD"] = 100] = "SHIELD";
    //Pawn abilities [200-299]
    PieceAbilities[PieceAbilities["SCOUT"] = 200] = "SCOUT";
    //Knight abilities [300-399]
    PieceAbilities[PieceAbilities["TIME_TRAVEL"] = 300] = "TIME_TRAVEL";
    PieceAbilities[PieceAbilities["SMOLDERING"] = 301] = "SMOLDERING";
    //Bishop abilities [400-499]
    PieceAbilities[PieceAbilities["SNIPER"] = 400] = "SNIPER";
    PieceAbilities[PieceAbilities["CONVERT_ENEMY"] = 401] = "CONVERT_ENEMY";
    PieceAbilities[PieceAbilities["COLOR_COMPLEX"] = 402] = "COLOR_COMPLEX";
    //Rook abilities [500-599]
    PieceAbilities[PieceAbilities["TANK"] = 500] = "TANK";
    //Queen abilities [600-699]
    PieceAbilities[PieceAbilities["BECOME_KING"] = 600] = "BECOME_KING";
    //King abilities [700-799]
    PieceAbilities[PieceAbilities["SKIP"] = 700] = "SKIP";
    PieceAbilities[PieceAbilities["FRIENDLY_FIRE"] = 701] = "FRIENDLY_FIRE";
    PieceAbilities[PieceAbilities["BLITZKRIEG"] = 702] = "BLITZKRIEG";
    PieceAbilities[PieceAbilities["CASTLING"] = 703] = "CASTLING";
})(PieceAbilities = exports.PieceAbilities || (exports.PieceAbilities = {}));
