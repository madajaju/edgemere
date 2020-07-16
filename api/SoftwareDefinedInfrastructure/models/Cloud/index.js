
class Cloud {
    static definition = {
        name: 'Cloud',
        description: 'This represents a cloud in the ecosystem. This can be public or private onprem or offprem',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the cloud',
            },
            ename: {
                type: 'string',
                description: 'Extended name of the cloud. This gives the full path to the cloud in the system',
            }

        },
        associations: {
            type: {
                type: 'CloudType',
                cardinality: 1,
                composition: false,
                owner: false
            },
            resources: {
                type: 'Resource',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            adevices: {
                type: 'AggregatedDevice',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            datacenters: {
                type: 'DataCenter',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            reservations: {
                type: 'Reservation',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
            requests: {
                type: 'Request',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
        },
        view: {
            color: "#ffffaa",
            object2d: (options) => {
                // Triangle
                let material = {color: "#ffffaa", border: "#000000"};
                if (options) {
                    material = options;
                }

                return `<path d="M -3 -4 a 7.5 7.5 1 0 0 0 15 h 21 a 7.5 7.5 1 0 0 0 -15 a 3 3 1 0 0 -4.5 -3 a 6 6 1 0 0 -17.25 3 z"` +
                    ` style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Cloud3D${i}">` +
                        `<a-torus-knot radius="7" radius-tubular="10" segments-radial="64" segments-tubular="14" p="4" q="7" ` +
                            `material='${materials[i]}' ></a-torus-knot>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }

    }
}

module.exports = Cloud;

