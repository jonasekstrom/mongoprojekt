let {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist,searchSelected} = require("./database.js")
const express = require("express");
const app = express();
const port = 5000;


app.use(function(req,res,next){

  res.setHeader('Access-Control-Allow-Origin', '*');
  next();

})


app.get("/", (req,res) => {
    console.log("requsted URL: " + req.url);
    res.send("Default");
});

app.post("/login", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    //check if user has written correct username and password
    loginUser();
    res.send("Login");
});

app.post("/createUser", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    let user = ""
    req.on("data", (data)=>{
      user += data;
    })

    req.on("end", function(){
      let obj = JSON.parse(user);
      createUser(obj);

    })
    //check if user allready exists if not create new user.
    res.send("Post user to DB");
});

app.post("/createplaylist", (req,res)=>{

  console.log(req)

  let playlist = ""
  req.on("data", (data)=>{
    playlist += data;
  })

  req.on("end", function(){
    
    let obj = JSON.parse(playlist);
    console.log(playlist)
    createPlaylist(obj)
    res.send(JSON.parse(playlist))
  })

})

app.get("/playlist", (req,res) => {
  //when user is logged in all the playlist should show up on the homepage


    let doc;
    getAllPlaylists("javascriupt", function(err,docs){
        doc = docs
        console.log(JSON.stringify(docs))
        res.send(doc);
    })

  //when user is logged in all his or her playlists should be added to the state
    getUserPlaylist();
    console.log("requsted URL: " + req.url);
    // res.send("fetch all ");
});

app.get("/search", (req,res) => {
    //
    // console.log("userName: " + req.query.searchText);
    // console.log("firstGenre: " + req.query.firstGenre);
    // console.log("secondGenre: " + req.query.secondGenre);
    // console.log("thirdGenre: " + req.query.thirdGenre);
    let searchText = req.query.searchText.toLowerCase();
    let firstGenre = req.query.firstGenre.toLowerCase();
    let secondGenre = req.query.secondGenre.toLowerCase();
    let thirdGenre = req.query.thirdGenre.toLowerCase();

    searchSelected(searchText,firstGenre,secondGenre,thirdGenre, function(err,docs){
          console.log("this is docs: " +JSON.stringify(docs))

        res.send(JSON.stringify(docs))
    })
    // REQ - genres, username, playlist name
    // res.send("Search");
});

app.listen(port, () => {
    console.log("Listening on port " + port );
});
