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
function getAllPlaylists(java, callback){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

       db.collection(collectionName).find({}).toArray(function(err, docs) {
    		if( err )  // handle error here
    		console.log("Found the following records:");
    		callback(err,docs)
    	});
      console.log("connected to database!!!!")
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

      db.collection(collectionName).insertOne(playlist);

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}


function searchSelected(searchText,firstGenre,secondGenre,thirdGenre, callback){


  let first;
  let second;
  let third;

  if(firstGenre === "undefined"){
    console.log("fiiiiirst")
    first = ""
  }else{
    first = firstGenre
  }

  if(secondGenre === "undefined"){
    second = ""
  }else{
    second = secondGenre
  }
  if( thirdGenre === "undefined"){
    third = ""
  }else{
    third = thirdGenre
  }



    if(!searchText && !first && !second && !third){
      getAllPlaylists("_", function(err,docs){
          // console.log(docs)
          callback(err,docs)
      })
    }else if(!searchText && first || second || third){
      let arr= [first,second,third]
      console.log(arr)

      findPlaylistsGenre(arr, function(err,docs){
          // console.log(docs)
          callback(err,docs)
      })
    }else if(searchText && !first && !second && !third){
      console.log("JAVASCRIPT")
      console.log(searchText)
      console.log("first: " + first)
      console.log("second: " + second)
      console.log("third: " + third)
      findPlaylistsText(searchText, function(err,docs){
          callback(err,docs)
      })
    }

}


function findPlaylistsText(searchText, callback) {

  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      let text = searchText.toLowerCase();

      // db.playlist.find({ $or: [ { userName: "thatzita" }, { playListName: "code" } ] })
      db.collection(collectionName).find({ $or: [ { userName: new RegExp(text) }, { playListName: new RegExp(text) } ] }).toArray(function(err, docs){
        console.log(err)
        console.log(docs)
        callback(err,docs)
      })

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });

}
// db.playlist.aggregate([{ $match: { $and: [{creator: "Leif"}, {name:"LeifPlaylist"}]}}]) för både creator + playlistname

// function findPlaylistsByCreatorAndName(){
//   MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
//      if( err ) throw err;  // if unable to connect
//       const db = client.db(dbName);  // ansluten
//       const collectionName = "playlist";
//       console.log(playlist)
//
//       const queryCreator = ''
//       const queryPlaylistName = ''
//
//       db.collection(collectionName).aggregate([{ $match: { $and: [{ creator: queryCreator }, {name: queryPlaylistName }]}}]) //both creator and name must match
//       console.log("connected to database!!!!")
//        client.close();  // remember to close connections when done
//   });
// }
//
//
// //find Playlist based on creator
// function findPlaylistsByCreator(){
//   MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
//      if( err ) throw err;  // if unable to connect
//       const db = client.db(dbName);  // ansluten
//       const collectionName = "playlist";
//       console.log(playlist)
//
//       const queryCreator = ''
//
//         db.collection(collectionName).aggregate([{ $match: { creator: queryCreator}}])
//
//       console.log("connected to database!!!!")
//        client.close();  // remember to close connections when done
//   });
// }
//
// //find Playlist by name
//
// function findPlaylistsByName(){
//   MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
//      if( err ) throw err;  // if unable to connect
//       const db = client.db(dbName);  // ansluten
//       const collectionName = "playlist";
//       console.log(playlist)
//
//       const queryPlaylistName = ''
//
//         db.collection(collectionName).aggregate([{ $match: { name: queryPlaylistName}}])
//
//       console.log("connected to database!!!!")
//        client.close();  // remember to close connections when done
//   });
// }
//
// //find a specific playlist in the collection based on genres (maximum 3 genres)
// //db.playlist.aggregate([{$match: { genres: "blues"}}])
// //db.collection(collectionName).find( { genres: {$elemMatch: {"genre": queryGenre,"genre": queryGenre, "genre": queryGenre }}}) //med find
//
//
function findPlaylistsGenre(queryList, callback){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";


      console.log("this is " + queryList)

      db.collection(collectionName).find({genres: {$in: queryList}}).toArray(function(err, docs){
        console.log(err)
        console.log(docs)
        callback(err,docs)
      })



      //db.playlist.find({genres: {$in: ["rock", "metal"]}})

      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}



// db.playlist.find( { genres: {$elemMatch: {"genre":"disco","genre":"blues"}}})


module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist, searchSelected };
