const express = require("express");
const app = express();
const port = 5000;


app.get("/", (req,res) => {
    console.log("requsted URL: " + req.url);
    res.send("Default");
});

app.post("/login", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    res.send("Login");
});

app.post("/create", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ = username, email, pw
    res.send("Post user to DB");
});

app.get("/playlist", (req,res) => {
    console.log("requsted URL: " + req.url);
    res.send("fetch all the music");
});

app.get("/search", (req,res) => {
    console.log("requsted URL: " + req.url);
    // REQ - genres, username, playlist name
    res.send("Search");
});

app.listen(port, () => {
    console.log("Listening on port " + port );
});