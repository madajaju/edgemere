
class ResourceCost {
    static definition = {
        name: 'ResourceCost',
        description: 'Cost of the Resource',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the cost of the resource',
            },
            amount: {
                type: 'number',
                description: 'Amount of the cost',
            },
            units: {
                type: 'string',
                description: 'Unit of measure',
            }
        },
        associations: {
            parent: {
                type: 'ResourceInstanceType',
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
                let material = {color: "#aaffaa", border: "#000000"};
                if (options) {
                    material = options;
                }

                return `<circle cx="0" cy="0" r="5" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
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
                    retval += `<a-entity id="ResourceCost3D${i}">` +
                        `<a-circle radius="5" material='${materials[i]}' ></a-circle>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = ResourceCost;

