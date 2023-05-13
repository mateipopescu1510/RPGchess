const { connectToDb, getDb } = require('./mongo_db.js');


async function isValidCredentials(name, password){
    db = getDb();
    playersCollection = db.collection('players');
    console.log(name + " " + password);
    existingPlayer = await playersCollection.findOne({username: name});
    if(existingPlayer && existingPlayer.password == password)
        return true;
    return false;
}

module.exports = {isValidCredentials};