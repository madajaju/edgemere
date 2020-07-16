class AggregatedDevice {
    static definition = {
        name: 'AggregatedDevice',
        extends: 'Device',
        description: 'This is a construct that has other devices under it',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the aggregated device'
            },
            ename: {
                type: 'string',
                description: 'Extended name of the aggregated device'
            }
        },
        associations: {
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'parent'
            },
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            datacenter: {
                type: 'DataCenter',
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
                // Three Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<polygon points="-10,10 0,10 -5,0 -10,10" style="fill:${material.color};stroke:${material.border};stroke-width:1" /> ` +
                    `<polygon points="0,10 10,10 5,0 0,10" style="fill:${material.color};stroke:${material.border};stroke-width:1" /> ` +
                    `<polygon points="-5,0 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" /> `;
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
                    retval += `<a-entity id="AggregatedDevice3D${i}">` +
                        `<a-cone radius-bottom="8" height="16" radialSegments="10" position="8 -12 -8" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="8" height="16" radialSegments="10" position="-8 -12 -8" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="8" height="16" radialSegments="10" position="0 -12 8" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="8" height="16" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `</a-entity>`;
                }

                return retval;
            }
        }
    }
}

module.exports = AggregatedDevice;
