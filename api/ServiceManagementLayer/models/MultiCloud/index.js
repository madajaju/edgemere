
class MultiCloud {
    static definition = {
        name: 'MultiCloud',
        description: 'Multi Cloud is an aggregation of cloud tied together with policies that services are deployed.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the multicloud'
            }
        },
        associations: {
            clouds: {
                type: 'Cloud',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            polices: {
                type: 'PolicyCollection',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        /*
        statenet: {
            Init: {
                description: "Initial State"
                events: {
                    create: {
                        StateName: { }
                    }
                }
            },
            StateName: {
                description: "My Description of the state",
                events: {
                    eventName: {
                        StateName: {
                            condition: function(obj) { ... },
                            action: function(obj) { ... },
                        }
                    },
                    eventName2 ...
                }
                actions: {
                    entry: { entry1: function(obj) { ... } },
                    exit: { exit1: function(obj): { ... } }
                }
            }
        }
        */
        view: {
            color: "#aaffaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#aaffaa", border:"#000000"};
                if(options) {
                    material = options;
                }

                return `<path d="M -3 -4 a 7.5 7.5 1 0 0 0 15 h 21 a 7.5 7.5 1 0 0 0 -15 ` +
                    `a 3 3 1 0 0 -4.5 -3 a 6 6 1 0 0 -17.25 3 z M 3 2 a 4.5 4.5 1 0 0 0 9 ` +
                    `h 11.25 a 4.5 4.5 1 0 0 0 -9 a 2.25 2.25 1 0 0 -3.375 -2.25 a 4.125 4.125 ` +
                    `1 0 0 -8.625 2.25 z" style="fill:#aaffaa;stroke:#888888;stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#aaffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="MultiCloud3D${i}">` +
                        `<a-torus-knot radius="7" radius-tubular="10" segments-radial="64" segments-tubular="14" p="4" q="7" ` +
                        `material='${materials[i]}' ></a-torus-knot>` +
                        `<a-torus-knot radius="7" radius-tubular="10" segments-radial="64" segments-tubular="14" p="4" q="7" ` +
                        `position="0 17 0" material='${materials[i]}' ></a-torus-knot>` +
                        `<a-torus-knot radius="7" radius-tubular="10" segments-radial="64" segments-tubular="14" p="4" q="7" ` +
                        `position="0 -17 0" material='${materials[i]}' ></a-torus-knot>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = MultiCloud;

