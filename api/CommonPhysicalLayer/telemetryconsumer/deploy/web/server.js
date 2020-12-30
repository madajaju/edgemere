const fs = require('fs');
const server = require('ailtire');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3001
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/tc'

server.micro({
    baseDir: '.',
    prefix: 'cpl/tc',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port
});
