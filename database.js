const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017';
const dbName = 'sharemusic';  // Database Name


//check if user allready exists if not create new user.
function createUser(user){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

      db.collection(collectionName).insertOne(user)

       client.close();  // remember to close connections when done
  });
}

//check if user has written correct username and password
function loginUser(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "users";

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
        console.log("hej")

    		callback(err,docs)
    	});
  });
}



//when user is logged in all his or her playlists should be added to the state
function getUserPlaylist(){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

       client.close();  // remember to close connections when done
  });
}

//create a new playlist
function createPlaylist(playlist,callback){
  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      db.collection(collectionName).insertOne(playlist, function(err,docs){
        // console.log(docs.ops[0])
        callback(err, docs.ops[0])
      });

       client.close();  // remember to close connections when done
  });
}


function searchSelected(searchText,firstGenre,secondGenre,thirdGenre, callback){


  let first;
  let second;
  let third;

  if(firstGenre === "undefined"){
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
          callback(err,docs)
      })
    }else if(!searchText && (first || second || third)){
      let arr= [first,second,third]

      console.log("javascript")
      findPlaylistsGenre(arr, function(err,docs){
          callback(err,docs)
      })
    }else if(searchText && !first && !second && !third){

      findPlaylistsText(searchText, function(err,docs){
          callback(err,docs)
      })
    }else if(searchText && (first || second || third)){

      let genreArray= []
        if(first){
          genreArray.push(first)
        }
        if(second){
          genreArray.push(second)
        }
        if(third){
          genreArray.push(third)
        }

        console.log(genreArray)
      findPlaylistsTextAndGenre(searchText,genreArray, function(err,docs){
        callback(err,docs)

      })
    }

}

function findPlaylistsTextAndGenre(searchText, genres, callback){
    MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
       if( err ) throw err;  // if unable to connect
        const db = client.db(dbName);  // ansluten
        const collectionName = "playlist";
        // const queryCreator = ''
        // const queryPlaylistName = '
        console.log(genres.length)
        if(genres){
          db.collection(collectionName).find({ $or: [ { userName: new RegExp(searchText) }, { playListName: new RegExp(searchText)}, {genres:{$in:genres}}] }).toArray(function(err, docs){
            console.log("DOKFODSKFOSDKFOKSDOKODSKF")

            // db.collection(collectionName).find({ $and: [ { userName: new RegExp(searchText) }, { playListName: {$in: genres} } ] }).count().toArray(function(err,docs){
            //   console.log(docs)
            // })
            // db.collection(collectionName).aggregate([{ $match: { $and: [{ creator: queryCreator }, {name: queryPlaylistName }]}}]) //both creator and name must match
            callback(err,docs)
            client.close();  // remember to close connections when done
          });
        }else if(genres.length === 2){
          console.log("bajs")
        }




     })
}


function findPlaylistsText(searchText, callback) {

  MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";

      let text = searchText.toLowerCase();

      // db.playlist.find({ $or: [ { userName: "thatzita" }, { playListName: "code" } ] })
      db.collection(collectionName).find({ $or: [ { userName: new RegExp(text) }, { playListName: new RegExp(text) } ] }).toArray(function(err, docs){
        callback(err,docs)
      })

       client.close();  // remember to close connections when done
  });

}
// db.playlist.aggregate([{ $match: { $and: [{creator: "Leif"}, {name:"LeifPlaylist"}]}}]) för både creator + playlistname

// function findPlaylistsByCreatorAndName(){
//   MongoClient.connect(url,  {useNewUrlParser: true}, (err, client) => {
//      if( err ) throw err;  // if unable to connect
//       const db = client.db(dbName);  // ansluten
//       const collectionName = "playlist";
//
//       const queryCreator = ''
//       const queryPlaylistName = ''
//
//       db.collection(collectionName).aggregate([{ $match: { $and: [{ creator: queryCreator }, {name: queryPlaylistName }]}}]) //both creator and name must match
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
//
//       const queryCreator = ''
//
//         db.collection(collectionName).aggregate([{ $match: { creator: queryCreator}}])
//
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
//
//       const queryPlaylistName = ''
//
//         db.collection(collectionName).aggregate([{ $match: { name: queryPlaylistName}}])
//
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



      db.collection(collectionName).find({genres: {$in: queryList}}).toArray(function(err, docs){
        callback(err,docs)
      })



      //db.playlist.find({genres: {$in: ["rock", "metal"]}})

       client.close();  // remember to close connections when done
  });
}

function deleteListBackEnd(listToDelete){
  console.log("går den in?")
  MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log("test")
      db.collection(collectionName).deleteOne( { "_id" : ObjectId(listToDelete)});
      //db.test_users.remove( {"_id": ObjectId("4d512b45cc9374271b02ec4f")});
        callback(err,docs)
      })

       client.close();  // remember to close connections when done

}



// db.playlist.find( { genres: {$elemMatch: {"genre":"disco","genre":"blues"}}})


module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist, searchSelected, deleteListBackEnd};
