async function handleGames(io) {
    io.on('connection', (socket) => {
        const gameId = socket.handshake.query.gameId;
        console.log("User joined " + gameId);
        socket.join(gameId);        // create virtual room for the game
        io.to(gameId).emit('message', "New player joined.\n");

        socket.on("message", (msg) => {
            io.to(gameId).emit("message", msg);
            console.log(msg);
        })


        socket.on("disconnect", () => {
            io.to(gameId).emit('message', "A player left the game.\n");
        });

    })
}

module.exports = {handleGames};