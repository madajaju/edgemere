
class DataCenter {
    static definition = {
        name: 'DataCenter',
        description: 'This represent the physical data center and contains several devices',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Datacenter'
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'datacenter'
            },
            adevices: {
                type: 'AggregatedDevice',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'datacenter'
            },
        },
        statenet: {
            Init: {
                events: {
                    create: {
                        Enabled: {}
                    },
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
                return `<rect width="20" height="40" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="DataCenter3D${i}">` +
                        `<a-box width="20" height="40" depth="20" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataCenter;

