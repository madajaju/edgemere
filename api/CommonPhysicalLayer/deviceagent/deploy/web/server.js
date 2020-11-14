const fs = require('fs');
const server = require('ailtire');
const bent = require('bent');

let hostname = process.env.HOSTNAME;
let port = process.env.EDGEMERE_PORT || 3000;
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/da';
let deviceManagerURL = process.env.EDGEMERE_DEVICE_MANAGER || 'localhost:3000';

let url = `http://${deviceManagerURL}/`;
global.parentPost = bent(url);
await global.parentPost('register', {name: 'here', url:hostname});

let intervalID = setInterval(async () => {
    console.log("Getting Stats");
    let stats = await AService.call("stats.get", {});
    await AService.call("stats.send", {name: deviceName, stats: stats});
}, 60000);

server.micro({
    baseDir: '.',
    prefix: 'cpl/da',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port
});
