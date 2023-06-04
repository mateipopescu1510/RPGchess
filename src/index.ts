// Import required libraries
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import * as uuid  from 'uuid';
import cookieParser from 'cookie-parser';

import * as mongodb from './mongoDB';
import * as login from './loginValidation';
import * as gameSocket from './gameSocket';
import * as matchmaking from './matchmaking';


// Create Express app
const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');

const io = new socketIO.Server(server)

// Set up body-parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('resources'));


// MongoDB connect
mongodb.connectToDb().catch((err) => { console.log(err) });

// create virtual game rooms and handle communications
gameSocket.handleGames(io).catch((err) => { console.log(err) });    

app.get('/game', (req, res) => {
    let newGameId = uuid.v4();
    res.redirect(`/game/${newGameId}`);
});

app.get('/game/:gameId', (req, res) => {
    let gameId = req.params.gameId;
    let playerPerspective = Math.random() < 0.5 ? "WHITE" : "BLACK";
    res.render('pages/game', {gameId: gameId, playerPerspective: playerPerspective});

});

app.get('/joinQueue', (req, res) => {
    let userId = req.cookies.userId; // Retrieve the user ID from the cookie
    if (!userId) {
        userId = uuid.v4(); // Generate a new user ID
        res.cookie('userId', userId); // Set the user ID in a cookie
    }
   matchmaking.joinQueue(userId, res);
});

app.get('/joinQueuef', (req, res) => {          // FOR TESTING PURPOSES ONLY (to allow 2 instances with no immediate response on same browser)
    let userId = req.cookies.userId; 
    if (!userId) {
        userId = uuid.v4(); 
        res.cookie('userId', userId); 
    }
   matchmaking.joinQueue(userId, res);
});

app.get('/leaveQueue', (req, res) => {
    let userId = req.cookies.userId;
    if (!userId) {
        userId = uuid.v4(); 
        res.cookie('userId', userId); 
        return;
    }
    matchmaking.leaveQueue(userId);
});

app.get('/register', (req, res) => {
    res.render('pages/register');
});

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
    if (await login.isValidCredentials(username, password))
      res.redirect('/game');
    else 
      res.send("Invalid account.");
  });


server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');

});
