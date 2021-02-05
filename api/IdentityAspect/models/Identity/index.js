
class Identity {
    static definition = {
        name: 'Identity',
        description: 'Identity of the entity in the system',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the identity',
            },
            username: {
                type: 'string',
                description: 'UserName of the identity',
            },
            password: {
                type: 'string',
                description: 'Password of the identity',
            },
            cert: {
                type: 'string',
                description: 'Certificate of the identity',
            }
        },
        associations: {
            /* assoc1: {
                type: 'ModelName',
                cardinality: 1,
                composition: false,
                owner: false,
            },
             */
        },
        view: {
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<polygon points="-5,0 0,10 5,0 0,-10 -5,0" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<polygon points="-2,3 3,13 8,3 3,-7 -2,3" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffcc88; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="DataRequest3D${i}">` +
                        `<a-octahedron radius="3" material="${materials[i]}" ></a-cyu>` +
                        `<a-octahedron radius="3" position="3 3 3" material="${materials[i]}" ></a-cyu>` +
                        `</a-entity>`;
                }
                return retval;

            }
        }
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
    }
}

module.exports = Identity;

