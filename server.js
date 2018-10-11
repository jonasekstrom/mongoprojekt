let {createUser, loginUser, getAllPlaylists, getUserPlaylist, createPlaylist,searchSelected, deleteList} = require("./database.js")
const express = require("express");
const app = express();
const port = 5000;


app.use(function(req,res,next){

  res.setHeader('Access-Control-Allow-Origin', '*');
  next();

})


app.get("/", (req,res) => {
    res.send("Default");
});

app.post("/login", (req,res) => {
    // REQ = username, email, pw
    //check if user has written correct username and password
    loginUser();
    res.send("Login");
});

app.post("/createUser", (req,res) => {
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


  let playlist = ""
  req.on("data", (data)=>{
    playlist += data;
  })

  req.on("end", function(){

    let obj = JSON.parse(playlist);
    createPlaylist(obj, function(err,docs){
      console.log("this is the docs: ", docs)
      res.send(JSON.stringify(docs))
    })
  })

})

app.get("/playlist", (req,res) => {
  //when user is logged in all the playlist should show up on the homepage


    let doc;
    getAllPlaylists("_", function(err,docs){
        doc = docs
        res.send(doc);
    })

  //when user is logged in all his or her playlists should be added to the state
    getUserPlaylist();
    // res.send("fetch all ");
});

app.get("/search", (req,res) => {
    //
    let searchText = req.query.searchText.toLowerCase();
    let firstGenre = req.query.firstGenre.toLowerCase();
    let secondGenre = req.query.secondGenre.toLowerCase();
    let thirdGenre = req.query.thirdGenre.toLowerCase();


    searchSelected(searchText,firstGenre,secondGenre,thirdGenre, function(err,docs){
        res.send(JSON.stringify(docs))
    })
    // REQ - genres, username, playlist name
    // res.send("Search");
});

app.post("/delete", (req,res) => {
  let listToDelete = ''
  
  
  req.on("data", (data)=>{
    listToDelete += data;
  })

  req.on("end", function(){
    console.log("llolplpol")
    //let obj = JSON.parse(listToDelete)
    console.log(listToDelete);
   // res.send(JSON.stringify(obj))
    // createPlaylist(obj, function(err,docs){
    //   console.log("this is the docs: ", docs)
    //   res.send(JSON.stringify(docs))
    // })
  });
})


app.listen(port, () => {
});
