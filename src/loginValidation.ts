import * as mongodb from './mongoDB';

export async function isValidCredentials(name : string, password : string){
    let db = mongodb.getDb();
    let playersCollection = db.collection('players');
    console.log(name + " " + password);
    let existingPlayer = await playersCollection.findOne({username: name});
    if(existingPlayer && existingPlayer.password == password)
        return true;
    return false;
}