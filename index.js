// Import required libraries
const http = require('http');
const express = require('express');
const urlencoded = require('body-parser');
const socketIO = require('socket.io');

const { connectToDb, getDb } = require('./mongo_db.js');
const { isValidCredentials } = require('./login_validation.js');


// Create Express app
const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');

const io = socketIO(server);

// Set up body-parser middleware to parse request bodies
app.use(urlencoded({ extended: true }));

// MongoDB connect
connectToDb();


app.get('/game', (req, res) => {
    res.render('pages/game');
})

app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.post('/register', (req, res) => {
    const playersCollection = getDb().collection('players');

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
    if (await isValidCredentials(username, password))
      res.redirect('/game');
    else 
      res.send("Invalid account.");
  });


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
