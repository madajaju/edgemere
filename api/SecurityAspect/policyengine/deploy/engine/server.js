const fs = require('fs');
// Check for node_modules directory. If it exists then continue. If not ask to run npm install.
if(!fs.existsSync('./node_modules')) {
    console.error('Error: you must run "npm install" first');
    return;
}
const server = require('ailtire');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3000;
let urlPrefix = process.env.AILTIRE_BASEURL || '/sa/pe';
let redisUrl = process.env.AILTIRE_REDIS_URL || null;
let managingService = process.env.EDGEMERE_ADMIN_URL || 'localhost:3000';

let config = {
    name: 'policyengine',
    baseDir: '.',
    prefix: 'sa/pe',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port,
    servers: [
        { pattern: "*", url: managingService }
    ],
};

if(redisUrl) {
    let items = redisUrl.split(':');
    let redisHost = items[0] || 'redis';
    let redisPort = items[1] || '6374';
    config.redis =  {
        host: redisHost,
        port: redisPort
    }
}

server.micro(config);
