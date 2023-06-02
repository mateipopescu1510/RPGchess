// Import required libraries
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import * as uuid  from 'uuid';

import * as mongodb from './mongoDB';
import * as login from './loginValidation';
import * as gameSocket from './gameSocket';


// Create Express app
const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');

const io = new socketIO.Server(server)

// Set up body-parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));


// MongoDB connect
mongodb.connectToDb();

// create virtual game rooms and handle communications
gameSocket.handleGames(io);    

app.get('/game', (req, res) => {
    let newGameId = uuid.v4();
    res.redirect(`/game/${newGameId}`);
})

app.get('/game/:gameId', (req, res) => {
    let gameId = req.params.gameId;
    res.render('pages/game', {gameId: gameId});

});

app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.post('/register', (req, res) => {
    const playersCollection = mongodb.getDb().collection('players');

    const { nickname, username, email, password } = req.body;
    const newPlayer = { nickname: nickname, username: username, email: email, password: password, games_won: 0, games_lost: 0, rating: 1000, friend_list: [], game_history: [], description: "", creation_date: new Date() };
    playersCollection.insertOne(newPlayer);

    res.redirect('/game');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password are valid
    if (await login.isValidCredentials(username, password))
      res.redirect('/game');
    else 
      res.send("Invalid account.");
  });

// Start the server
server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');

});
