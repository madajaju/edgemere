const fs = require('fs');
const server = require('ailtire');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3000
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/dm'
let deviceName = process.env.EDGEMERE_DEVICE_NAME || 'default';
let deviceURL = hostname + ':' + port;

server.micro({
    baseDir: '.',
    prefix: 'cpl/dm',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port,
    post: () => {
        // Create the Aggregated Device
        let adevice = new AggregatedDevice({name: deviceName});
        console.log("Created Aggregated Device");
    }
});
