const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const server = express();
const http = require('http').createServer(server);

let port = process.env.EDGEMERE_PORT || 3000

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


server.get('*', (req, res) => {
    console.log("Got:", req.body);
    res.end("Done");
});
console.log("Listening on port:", port);
server.listen(port);
