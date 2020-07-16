
class ResourceInstanceType {
    static definition = {
        name: 'ResourceInstanceType',
        description: 'This represents a resoure instance type in the different clouds.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource instance',
            },
            type: {
                type: 'string',
                description: 'Type of the resource instance',
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
                owner: true,
            },
            costs: {
                description: "Cost model for the Resource Instance Type",
                type: 'ResourceCost',
                unique: true,
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'parent'
            }
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

                return `<rect width="15" height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
            },
            object3d: () => {
                let materials = {
                    '': `color:#aaffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="ResourceInstanceType3D${i}">` +
                        `<a-box width="15" height="15" depth="15" material='${materials[i]}' ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = ResourceInstanceType;

