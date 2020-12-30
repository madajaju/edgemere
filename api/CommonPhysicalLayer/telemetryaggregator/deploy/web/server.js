const server = require('ailtire');
const bent = require('bent');
const AService = require('ailtire/src/Server/AService');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3002;
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/ta';
let telemetryParent = process.env.EDGEMERE_TELEMETRY_PARENT || 'localhost:3001';
let deviceName = process.env.EDGEMERE_DEVICE_NAME || 'adevice';
let redisUrl = process.env.AILTIRE_REDIS_URL || null;

if (telemetryParent) {
    let url = `http://${telemetryParent}/`;
    global.parentPost = bent(url);
}

let intervalID = setInterval(async () => {
    console.log("Getting Stats");
    let stats = await AService.call("stats.get", {});
    await AService.call("stats.send", {name: deviceName, stats: stats});
}, 60000);

let config = {
    name: 'telemetryaggregator',
    baseDir: '.',
    prefix: 'cpl/ta',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port,
    servers: [
        { pattern: "*", url: telemetryParent }
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
