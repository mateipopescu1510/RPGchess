const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://RPGchess:RttCA1CDfVaaF7bt@rpgchess.tjwsoi5.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'chess';

let db;

async function connectToDb() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to database server');
    db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };