var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("Connected");
    socket.on('device.create', function(msg){
        io.emit('device.create', msg);
    });
});

let timerId = setInterval(() => { io.emit('device.create', 'I am here'); console.log("Send io");  }, 2000);

http.listen(port, function(){
    console.log('listening on *:' + port);
});
/*
const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if(!fs.existsSync('./node_modules')) {
   console.error('Error: you must run "npm install" first');
   return;
}
const server = require('ailtire');
let host = process.env.AITIRE_HOST || 'localhost'
let port = process.env.AITIRE_PORT || 3000
let urlPrefix = process.env.AITIRE_BASEURL || '/web'


server.testsocket( {
    baseDir: '.',
    prefix: 'edgemere',
    routes: {
    },
    host: host,
    urlPrefix: urlPrefix,
    listenPort: port
});

*/
