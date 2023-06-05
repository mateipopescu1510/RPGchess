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
import { gamesInProgress } from "./gameSocket";
import { LEVEL_UP_XP } from './enums';

const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');

const io = new socketIO.Server(server)

// Set up body-parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set static files folder
app.use(express.static('resources'));


mongodb.connectToDb().catch((err) => { console.log(err) });

// create virtual game rooms and handle communications
gameSocket.handleGames(io);  

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/boardstate', (req, res) => {
    let gameId = req.query.gameId as string;
    let game = gamesInProgress.get(gameId)!;
    let data = {fen: game.getGameState().getBoard().getFen(), turn: game.getGameState().getTurn(), levelUpXp: LEVEL_UP_XP, game: game};
    if(game)
        res.send(data);
    else
        res.send("Game not found");
});


app.get('/game/:gameId', (req, res) => {
    let gameId = req.params.gameId;
    let game = gamesInProgress.get(gameId);
    if(game)
    {
        let playerPerspective = req.cookies.userId === game.getWhiteId() ? "WHITE" : "BLACK";
        res.render('pages/game', {gameId: gameId, playerPerspective: playerPerspective});
    }
});

app.get('/joinQueue', (req, res) => {
    let userId = req.cookies.userId; // Retrieve the user ID from the cookie
    if (!userId) {
        userId = uuid.v4(); // Generate a new user ID
        res.cookie('userId', userId); // Set the user ID in a cookie
    }
    let gamemode = req.query.mode as string;
    matchmaking.joinQueue(userId, gamemode, res);
});

app.get('/leaveQueue', (req, res) => {
    let userId = req.cookies.userId;
    if (!userId) {
        userId = uuid.v4(); 
        res.cookie('userId', userId); 
        return;
    }
    let gamemode = req.query.mode as string;
    matchmaking.leaveQueue(userId, gamemode);
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
