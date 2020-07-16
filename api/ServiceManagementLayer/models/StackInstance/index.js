
class StackInstance {
    static definition = {
        name: 'StackInstance',
        description: 'The StackInstance is the execution of the Stack. This allows for control of the stack during execution.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the stackinstance',
            },
        },
        associations: {
            app: {
                description: 'Application Instance of the stack instance',
                type: 'ApplicationInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stack: {
                description: 'Stack of the Stack Instance',
                type: 'Stack',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stacklet: {
                description: 'Stacklet of the instance running',
                type: 'Stacklet',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            services: {
                description: 'Instances of the Services running in the Stack',
                type: 'ServiceInstance',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'stack'
            },
        },
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        Deploying: {}
                    }
                }
            },
            Deploying: {},
            Running: {},
            Failed: {},
            Completed: {},
        },
            /* Deploying: {
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
                    `<polygon points="-14,21 0,21 -3.5,7 -10.5,7 -14,21" style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<polygon points="0,21 14,21 10.5,7 3.5,7 0,21" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`+
                    `<circle cx="0" cy="5" r="7" style="fill:#cccccc;stroke:#888888;stroke-width:1" />`;

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
                    retval += `<a-entity id="StackInstance3D${i}">` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="-8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 -14 -10" material="${materials[i]}" ></a-cone>` +
                        `<a-sphere radius="8" position="0 -7 0" material="color:#ffffff; transparent:false; opacity:0.90"></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = StackInstance;

