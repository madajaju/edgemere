const path = require('path');
const si = require('systeminformation');

module.exports = {
    friendlyName: 'get',
    description: 'get the statstics for the device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        console.log("Getstats called");
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
        let device = Device.find({hostname: stats.osInfo.hostname});
        let chw = Hardware.find(device.name + '-' + stats.cpu.model);
        chw.addStats({
            stats: {
                available: {
                    memory: stats.mem.free
                },
                capabilities: {
                    memory: stats.mem.total
                },
                metrics: {
                    load: stats.currentLoad.currentload,
                    memory: stats.mem.free
                }
            }
        });
        for (let i in stats.fsSize) {
            let fsS = stats.fsSize[i];
            let available = fsS.size - fsS.used
            let shw = Hardware.find(device.name + '-' + fsS.fs);
            shw.addStats({
                stats: {
                    available: {
                        fssize: available
                    },
                    capabilities: {
                        fstype: fsS.type,
                        fssize: fsS.size,
                        mount: fsS.mount,
                    },
                    metrics: {
                        fssize: available
                    }
                }
            });
        }
        for (let i in stats.networkInterfaces) {
            let neti = stats.networkInterfaces[i];
            if (neti.internal === false && neti.virtual === false) {
                let nhw = Hardware.find(device.name + '-' + neti.iface);
                nhw.addStats({
                    stats: {
                        capabilities: {
                            netspeed: neti.speed
                        },
                    }
                });
            }
        }
        for (let i in stats.graphics.controllers) {
            let graphic = stats.graphics.controllers[i];

            let ghw = Hardware.find(device.name + '-' + graphic.model);
            ghw.addStats({
                stats: {
                    capabilities: {
                        vram: graphic.vram,
                        vbus: graphic.vbus
                    },
                }
            });
            // If internal and virtual are both false then it is real
        }
        return stats;
    }
};
