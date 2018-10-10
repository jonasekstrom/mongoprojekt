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

  console.log("first: " + firstGenre)
  console.log("second: " + secondGenre)
  console.log("third: " + thirdGenre)

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

  console.log("first: " + first)
  console.log("second: " + second)
  console.log("third: " + third)

    if(!searchText && !first && !second && !third){
      getAllPlaylists("javascriupt", function(err,docs){
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
    }

}






module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist, searchSelected };
