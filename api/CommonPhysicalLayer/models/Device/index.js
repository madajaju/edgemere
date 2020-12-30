
class Device {
    static definition = {
        name: 'Device',
        description: 'Representation of a device in a datacenter',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the device'
            },
            ename: {
                type: 'string',
                description: 'Extended Name of the device'
            },
            hostname: {
                type: 'string',
                description: 'Hostname of the device'
            },
            type: {
                type: 'string',
                description: 'Type of the Device'
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            hardware: {
                type: 'Hardware',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'device'
            },
            datacenter: {
                type: 'DataCenter',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            parent: {
                type: 'AggregatedDevice',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    create: {
                        Enabled: {}
                    },
                    reserve: {
                        Enabled: {}
                    }
                }
            },
            Enabled: {
                events: {
                    disable: {
                        Disabled: {}
                    }
                }
            },
            Disabled: {
                events: {
                    enable: {
                        Enabled: {}
                    }
                }
            }
        },
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                   material = options;
                }
                return `<polygon points="-10,10 10,10 0,-10 -10,10" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#cccccc; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Device3D${i}">` +
                        `<a-cone radius-bottom="10" height="20" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Device;

