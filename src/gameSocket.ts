import * as Game from './Game';
export let gamesInProgress : Map<string, Game.Game> = new Map();    

export function handleGames(io) {
    io.on('connection', (socket) => {
        const gameId = socket.handshake.query.gameId;
        const playerColor = socket.handshake.query.playerColor;
        console.log("User joined " + gameId);

        socket.join(gameId);        // create virtual room for the game
        let game = gamesInProgress.get(gameId)!;
        
        socket.on("move", (move) => {
            if(game.getGameState().getTurn() != playerColor)
                return;

            let isValidMove = game.getGameState().movePiece([move.from[0], move.from[1]], [move.to[0], move.to[1]]);
            if(isValidMove)
                socket.broadcast.to(gameId).emit("move", move);  // broadcast move to all other players in the room
            else
                socket.emit("invalidMove", move);        // send invalid move message to the player who made the move
        })

    })
}