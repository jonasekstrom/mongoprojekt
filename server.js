const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req,res) => {
    console.log("requsted URL: " + req.url);
    res.send("thatzita")
});

app.listen(port, () => {
    console.log("Listening on port 5000");
});