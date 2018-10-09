const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'sharemusic';  // Database Name


//check if user allready exists if not create new user.
function createUser(user){
  console.log(user)
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

      db.collection(collectionName).insertOne(user)

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//check if user has written correct username and password
function loginUser(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//when user is logged in all the playlist should show up on the homepage
function getAllPlaylists(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//when user is logged in all his or her playlists should be added to the state
function getUserPlaylist(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//create a new playlist
function createPlaylist(playlist){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(playlist)

      db.collection(collectionName).insertOne(playlist)

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

db.playlist.aggregate([{ $match: { $and: [{creator: "Jim"}, {name:"JimsPlaylist"}]}}]) för både creator + playlistname

function findPlaylistsByCreatorAndName(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(playlist)
      
      const queryCreator = ''
      const queryPlaylistName = ''
      
      db.collection(collectionName).aggregate([{ $match: { $and: [{ creator: queryCreator }, {name: queryPlaylistName }]}}]) //both creator and name must match
      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}



//find Playlist based on creator 
function findPlaylistsByCreator(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(playlist)
      
      const queryCreator = ''
      
        db.collection(collectionName).aggregate([{ $match: { creator: queryCreator}}])
      
      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//find Playlist by name

function findPlaylistsByName(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(playlist)
      
      const queryPlaylistName = ''
      
        db.collection(collectionName).aggregate([{ $match: { name: queryPlaylistName}}])
      
      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}

//find a specific playlist in the collection based on genres (maximum 3 genres)
//db.playlist.aggregate([{$match: { genres: "blues"}}]) 
//db.collection(collectionName).find( { genres: {$elemMatch: {"genre": queryGenre,"genre": queryGenre, "genre": queryGenre }}}) //med find


function findPlaylistsGenre(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(playlist)
      
      
      const queryGenre = '';
      const queryList = [];

      if(queryGenre !='') {
        queryList.push(queryGenre)
        console.log(queryList);
        db.collection(collectionsName).aggregate([{$match: {genres: { $in: queryList}}}])
      } else {
        console.log("Failed to push playlists")
      }
     
      
     
           
      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}





module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist, findPlaylists };
