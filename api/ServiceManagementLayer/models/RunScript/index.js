class RunScript {
    static definition = {
        name: 'RunScript',
        description: 'A RunScript is run when a service changes states. There are pre and post runscripts that can' +
            ' be run.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the runscript',
            }
        },
        associations: {
            owner: {
                type: 'ServiceInstance',
                cardinality: 1,
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
            return `<g transform="rotate(45)" >` +
                    `<rect x="-2.5" y="-10" width="5" height="20" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<rect x="-10" y="-2.5" width="20" height="5" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `</g>` +
                    `<rect x="-2.5" y="-10" width="5" height="20" width="20" height="5" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<rect x="-10" y="-2.5" width="20" height="5" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<circle cx="0" cy="0" r="7" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
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
                    retval += `<a-entity id="RunScript3D${i}">` +
                        `<a-cylinder radius="8" height="5" ` +
                        ` material='${materials[i]}' ></a-cylinder>` +
                        `<a-box width="20" height="5" depth="5" ` +
                            `material='${materials[i]}' ></a-box-knot>` +
                        `<a-box width="20" height="5" depth="5" ` +
                            `rotation="0 45 0" material='${materials[i]}' ></a-box>` +
                        `<a-box width="20" height="5" depth="5" ` +
                            `rotation="0 90 0" material='${materials[i]}' ></a-box>` +
                        `<a-box width="20" height="5" depth="5" ` +
                            `rotation="0 135 0" material='${materials[i]}' ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = RunScript;

