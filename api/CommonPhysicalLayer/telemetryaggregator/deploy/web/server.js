const server = require('ailtire');
const bent = require('bent');
const AService = require('ailtire/src/Server/AService');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3000;
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/ta';
let telemetryParent = process.env.EDGEMERE_TELEMETRY_PARENT || 'localhost:3001';
let deviceName = process.env.EDGEMERE_DEVICE_NAME || hostname;

if (telemetryParent) {
    let url = `http://${telemetryParent}/`;
    global.parentPost = bent(url);
}

let intervalID = setInterval(async () => {
    console.log("Getting Stats");
    let stats = await AService.call("stats.get", {});
    await AService.call("stats.send", {name: deviceName, stats: stats});
}, 60000);

server.micro({
    baseDir: '.',
    prefix: 'cpl/ta',
    routes: {},
    redis: { host}
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port
});
