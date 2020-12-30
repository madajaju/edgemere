const fs = require('fs');
const server = require('ailtire');
const AEvent = require('ailtire/src/Server/AEvent');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3000;
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/da';
let deviceManagerHost = process.env.EDGEMERE_DEVICE_MANAGER || 'localhost:3000';
let deviceName = process.env.EDGEMERE_DEVICE_NAME || 'default';
let deviceURL = hostname + ':' + port;

setInterval(async () => {
    console.log("Registering Agent");
    console.log("Device Manager:", deviceManagerHost);
    AEvent.emit('agent.started', {name: deviceName, url:deviceURL});
}, 60000);

server.micro({
    baseDir: '.',
    prefix: 'cpl/da',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port,
    servers: [
        { pattern: "*", url: deviceManagerHost }
    ],
    post: () => {
        console.log("Registering Agent");
        AEvent.emit('agent.started', {name: deviceName, url:deviceURL});
    }
});
