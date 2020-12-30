const server = require('ailtire');
const bent = require('bent');
const AService = require('ailtire/src/Server/AService');
const si = require('systeminformation');

let hostname = process.env.HOSTNAME || 'localhost';
let port = process.env.EDGEMERE_PORT || 3000;
let urlPrefix = process.env.AILTIRE_BASEURL || '/cpl/tp';
let telemetryParent = process.env.EDGEMERE_TELEMETRY_PARENT || 'localhost:3001';
let deviceName = process.env.EDGEMERE_DEVICE_NAME || hostname;
let redisUrl = process.env.AILTIRE_REDIS_URL || null;
let managingService = process.env.EDGEMERE_ADMIN_URL || 'localhost:3000';

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
    name: 'telemetryproducer',
    baseDir: '.',
    prefix: 'cpl/tp',
    routes: {},
    host: hostname,
    urlPrefix: urlPrefix,
    listenPort: port,
    servers: [
        { pattern: "*", url: "localhost:3002" },
        { pattern: "*", url: managingService }
    ],
    post: async () => {
        let device = await initDevice();
        console.log("Device: ", device);
    }
}

if (redisUrl) {
    let items = redisUrl.split(':');
    let redisHost = items[0] || 'redis';
    let redisPort = items[1] || '6374';
    config.redis = {
        host: redisHost,
        port: redisPort
    }
}

server.micro(config);

async function initDevice() {
    let valueObject = {
        cpu: '*',
        mem: '*',
        currentLoad: '*',
        fsSize: '*',
        networkInterfaces: '*',
        graphics: '*',
        osInfo: '*',
    };
    let stats = await si.get(valueObject);
    let device = new Device({name: deviceName});
    device.hostname = stats.osInfo.hostname;
    let capabilities = {
        'speed': stats.cpu.speed,
        'cores': stats.cpu.cores,
        'physicalCores': stats.cpu.physicalCores,
        'processors': stats.cpu.processors,
        'memory': stats.mem.total
    }
    let computeHW = Hardware.factory({
        name: deviceName + '-' + stats.cpu.model,
        type: 'Compute',
        capabilities: capabilities
    });
    device.addToHardware(computeHW);
    for (let i in stats.fsSize) {
        let fsS = stats.fsSize[i];
        let capabilities = {
            'fstype': fsS.type,
            'fssize': fsS.size,
            'mount': fsS.mount,
        }
        let storageHW = Hardware.factory({name: deviceName + '-' + fsS.fs, type: 'Storage', capabilities: stats});
        device.addToHardware(storageHW);
    }
    for (let i in stats.networkInterfaces) {
        let neti = stats.networkInterfaces[i];
        // If internal and virtual are both false then it is real
        if (neti.internal === false && neti.virtual === false) {
            let caps = {
                'netspeed': neti.speed,
            }
            let hw = Hardware.factory({name: deviceName + '-' + neti.iface, type: 'Network', capabilities: caps});
            device.addToHardware(hw);
        }
    }
    for (let i in stats.graphics.controllers) {
        let graphic = stats.graphics.controllers[i];
        // If internal and virtual are both false then it is real
        let caps = {
            'vram': graphic.vram,
            'vbus': graphic.vbus,
        }
        let hw = Hardware.factory({name: deviceName + '-' + graphic.model, type: 'Accelerator', capabilities: caps});
        device.addToHardware(hw);
    }
    return device;
}
