class Policy {
    static definition = {
        name: 'Policy',
        description: 'policy can be applied to any entity in the system including Applications, Stacks, Resource, Devices, ...',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the policy',
            }
        },
        associations: {
            owner: {
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
            color: "#ffaaaa",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffaaaa", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="0" cy="0" r="4" length="3.14" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<circle cx="0" cy="0" r="2" style="fill:white;stroke:${material.border};stroke-width:1" />` +
                    `<rect width="10" height="8" x="-5" y="0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffaaaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Policy3D${i}">` +
                        `<a-torus radius="3" radius-tubular="0.5" material="${materials[i]}" ></a-cone>` +
                        `<a-box width="8" height="10" depth="4" position="5 0 0" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Policy;

