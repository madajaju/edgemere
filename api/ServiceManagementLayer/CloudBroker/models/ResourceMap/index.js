class ResourceMap {
    static definition = {
        name: 'ResourceMap',
        description: 'This maps generalized resource name/requirement to one or more requirements for the specific ' +
            'cloud resource.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource reference',
            }
        },
        associations: {
            value: {
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

                return `<rect x="5" y="5" width="15" height="15" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<rect width="15" height="15" style="fill:none;stroke:${material.border};stroke-width:1;stroke-dasharray:3;" />` ;
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
                    retval += `<a-entity id="ResourceMap3D${i}">` +
                        `<a-box width="15" height="15" depth="15" material='${materials[i]}' ></a-box>` +
                        `<a-box width="15" height="15" depth="15" position="5 5 5" material='${materials[i]} wireframe:true' ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = ResourceMap;

