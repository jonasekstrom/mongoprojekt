
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const url = "mongodb://admin:abc123@ds125683.mlab.com:25683/shareyourmusic";
const dbName = "shareyourmusic"; // Database Name


//check if user allready exists if not create new user.
function createUser(user) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "users";

      db.collection(collectionName).insertOne(user);

      client.close(); // remember to close connections when done
    }
  );
}

//check if user has written correct username and password
function loginUser() {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "users";

      client.close(); // remember to close connections when done
    }
  );
}

//when user is logged in all the playlist should show up on the homepage
function getAllPlaylists(java, callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";
      db.collection(collectionName)
        .find({})
        .toArray(function(err, docs) {
          if (err) throw err; // handle error here

          callback(err, docs);
        });
    }
  );
}

//when user is logged in all his or her playlists should be added to the state
function getUserPlaylist() {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";

      client.close(); // remember to close connections when done
    }
  );
}

//create a new playlist
function createPlaylist(playlist, callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";

      db.collection(collectionName).insertOne(playlist, function(err, docs) {
        callback(err, docs.ops[0]);
      });

      client.close(); // remember to close connections when done
    }
  );
}
//create a new playlist
function updatePlaylist(playlist, callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";

      db.collection(collectionName).updateOne(
        {
          _id: ObjectId(playlist._id)
        },
        {
          $set: {
            playListName: playlist.playListName,
            userName: playlist.userName,
            description: playlist.description,
            spotify: playlist.spotify,
            genres: playlist.genres,
            creator: playlist.creator
          }
        }
      );

      client.close(); // remember to close connections when done
    }
  );
}

function searchSelected(
  searchText,
  firstGenre,
  secondGenre,
  thirdGenre,
  callback
) {
  let first;
  let second;
  let third;

  if (firstGenre === "undefined") {
    first = "";
  } else {
    first = firstGenre;
  }

  if (secondGenre === "undefined") {
    second = "";
  } else {
    second = secondGenre;
  }
  if (thirdGenre === "undefined") {
    third = "";
  } else {
    third = thirdGenre;
  }

  if (!searchText && !first && !second && !third) {
    getAllPlaylists("_", function(err, docs) {
      callback(err, docs);
    });
  } else if (!searchText && (first || second || third)) {
    let arr = [first, second, third];

    findPlaylistsGenre(arr, function(err, docs) {
      callback(err, docs);
    });
  } else if (searchText && !first && !second && !third) {
    findPlaylistsText(searchText, function(err, docs) {
      callback(err, docs);
    });
  } else if (searchText && (first || second || third)) {
    let genreArray = [];
    if (first) {
      genreArray.push(first);
    }
    if (second) {
      genreArray.push(second);
    }
    if (third) {
      genreArray.push(third);
    }

    findPlaylistsTextAndGenre(searchText, genreArray, function(err, docs) {
      callback(err, docs);
    });
  }
}

function findPlaylistsTextAndGenre(searchText, genres, callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";

      if (genres) {
        db.collection(collectionName)
          .aggregate([
            {
              $match: {
                $or: [
                  { userName: new RegExp(searchText) },
                  { playListName: new RegExp(searchText) }
                ]
              }
            },
            { $match: { genres: { $in: genres } } }
          ])
          .toArray(function(err, docs) {
            callback(err, docs);
            client.close(); // remember to close connections when done
          });

        // db.playlist.aggregate([
        //
        //   {$match:{$or:[{ userName:"thatzita" }, { playListName: "thatzita" }]}},
        //   {$match:{genres:{$in:["metal","classical"]}}}
        // ])

        //
        // db.collection(collectionName).find({ $or: [{ userName: new RegExp(searchText) }, { playListName: new RegExp(searchText) }, { genres: { $in: genres } }] }).toArray(function (err, docs) {
        //   callback(err, docs)
        //   client.close();  // remember to close connections when done
        // });
      }
    }
  );
}

function findPlaylistsText(searchText, callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "playlist";

      let text = searchText.toLowerCase();

      // db.playlist.find({ $or: [ { userName: "thatzita" }, { playListName: "code" } ] })
      db.collection(collectionName)
        .find({
          $or: [
            { userName: new RegExp(text) },
            { playListName: new RegExp(text) }
          ]
        })
        .toArray(function(err, docs) {
          callback(err, docs);
        });

      client.close(); // remember to close connections when done
    }
  );
}



function deleteListBackEnd(listToDelete){
  console.log("går den in?")
  MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(listToDelete)
      //db.collection(collectionName).deleteOne( { "_id" : ObjectId(listToDelete)});
      db.collection(collectionName).deleteOne( {_id: ObjectId(listToDelete)}, (err, result) => {
        if( err) throw err
        console.log("success")
        
        client.close()

      })
       
      })

        // remember to close connections when done

}

function deleteAllListBackEnd(creatorListsToDelete) {
  console.log("går den in?")
  MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      const collectionName = "playlist";
      console.log(creatorListsToDelete)
      console.log("DELTETE DÅ")
     
      db.collection(collectionName).deleteMany( {creator: creatorListsToDelete}, (err, result) => {
        if( err) throw err
        console.log("success")
        
        client.close()

      })
       
      })

        // remember to close connections when done

}





function findPlaylistsGenre(queryList, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;  // if unable to connect
    const db = client.db(dbName);  // ansluten
    const collectionName = "playlist";



    db.collection(collectionName).find({ genres: { $in: queryList } }).toArray(function (err, docs) {
      callback(err, docs)
    })

    client.close();  // remember to close connections when done
  });
}


module.exports = {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist, searchSelected, deleteListBackEnd, deleteAllListBackEnd};



