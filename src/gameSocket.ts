import * as Game from './Game';
export let gamesInProgress : Map<string, Game.Game> = new Map();    

export function handleGames(io) {
    io.on('connection', (socket) => {
        const gameId = socket.handshake.query.gameId;
        console.log("User joined " + gameId);

        socket.join(gameId);        // create virtual room for the game
        let game = gamesInProgress.get(gameId)!;

        socket.on("message", (msg : string) => {
            io.to(gameId).emit("message", msg);
            console.log(msg);
            let move = msg.split(" ");
            console.log(game);
           // game.movePiece([parseInt(move[0]), parseInt(move[1])],[parseInt(move[2]), parseInt(move[3])]);
            //game.printBoard();
        })

    })
}