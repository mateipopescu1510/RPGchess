const board = require("./Board.ts")
gamesInProgress = new Map();    

async function handleGames(io) {
    io.on('connection', (socket) => {
        const gameId = socket.handshake.query.gameId;
        console.log("User joined " + gameId);

        socket.join(gameId);        // create virtual room for the game
        if(!gamesInProgress.get(gameId))
        {
            var game = new board.Board("8 8/rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
            gamesInProgress.set(gameId, 1);
        }

        socket.on("message", (msg) => {
            io.to(gameId).emit("message", msg);
            console.log(msg);
            let move = msg.split(" ");
            game.movePiece([parseInt(move[0]), parseInt(move[1])],[parseInt(move[2]), parseInt(move[3])]);
            game.printBoard();
        })

    })
}

module.exports = {handleGames};
