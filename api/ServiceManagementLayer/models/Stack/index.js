class Stack {
    static definition = {
        name: 'Stack',
        description: 'A Stack is an aggregation of services in one context. The Stack can have any number ' +
            'of Services and has a stacklet for each environment in the system. Application typically ' +
            'have 1 or more stacks to define their applications.',
        attributes: {
            name: {
                description: 'Name of the stack',
                type: 'string',
            },
            version: {
                description: 'Version of the stack',
                type: 'string',
            },
            parameters: {
                description: 'Parameters of the stack [ {name:value} ]',
                type: 'json',
            },
        },
        associations: {
            policies: {
                description: 'Policy Collection',
                type: 'PolicyCollection',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stacklets: {
                description: 'Stacklets of the stack and environment',
                type: 'Stacklet',
                cardinality: 'n',
                unique: true,
                composition: true,
                owner: true,
                via: 'stack'
            },
            services: {
                description: 'Services of the stack',
                type: 'Service',
                cardinality: 'n',
                unique: true,
                composition: true,
                owner: true,
                via: 'stack'
            },
            instances: {
                description: 'Instances of the stack',
                type: 'StackInstance',
                cardinality: 'n',
                unique: false,
                composition: true,
                owner: true,
                via: 'stack'
            },
            app: {
                description: 'Applications of the stacks',
                type: 'Application',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            data: {
                description: 'Data for the stack',
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner: true,
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
                return `<polygon points="-7,7 7,7 3.5,-7 -3.5,-7 -7,7" style="fill:${material.color};stroke:${material.border};stroke-width:1" /> ` +
                    `</polygon><polygon points="-14,21 0,21 -3.5,7 -10.5,7 -14,21" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<polygon points="0,21 14,21 10.5,7 3.5,7 0,21" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="Stack3D${i}">` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="-8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 -14 -10" material="${materials[i]}" ></a-cone>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Stack;

