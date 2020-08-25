
class Stacklet {
    static definition = {
        name: 'Stacklet',
        description: 'This is a combination of the stack with a specific environment. This allows for a stack to behave ' +
            'differently depending on the envionrment it is in.',
        extends: 'Servicelet',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Stacklet',
            },
            version: {
                type: 'string',
                description: 'Name of the Stacklet',
            },
            parameters: {
                type: 'json',
                description: 'Parameters for the stacklet [ {name:value }]',
            }
        },
        associations: {
            stack: {
                description: 'Parent Stack for the Stacklet',
                type: 'Stack',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            servicelets: {
                description: 'Service with environment for the Stacklet',
                type: 'Servicelet',
                cardinality: 'n',
                composition: true,
                owner:true,
                via: 'stacklet'
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
        },
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
                    `<polygon points="0,21 14,21 10.5,7 3.5,7 0,21" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`+
                    `<rect width="30" height="3" x="-15" y="21" style="fill:#cccccc;stroke:#888888;stroke-width:1" />`;
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
                    retval += `<a-entity id="Stacklet3D${i}">` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="-8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="8 -14 2" material="${materials[i]}" ></a-cone>` +
                        `<a-cone radius-bottom="7" radius-top="3.5" height="14" radialSegments="10" position="0 -14 -10" material="${materials[i]}" ></a-cone>` +
                        `<a-box width="30" height="30" depth="3" position="0 -21 0" rotation="90 0 0" material="color:#ffffff; transparent:true; opacity:0.60"></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Stacklet;

