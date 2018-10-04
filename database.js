const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'sharemusic';  // Database Name


function ConnectToDB(){
  MongoClient.connect(url, (err, client) => {
     if( err ) throw err;  // if unable to connect
      const db = client.db(dbName);  // ansluten
      console.log("connected to database!!!!")
       client.close();  // remember to close connections when done
  });
}


module.exports = {ConnectToDB};
