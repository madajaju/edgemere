
class ApplicationInstance {
    static definition = {
        name: 'ApplicationInstance',
        description: 'Application Instance that is running in the ecosystem',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the application instance'
            },
            status: {
                type: 'string',
                description: 'Name of the application instance'
            },
            message: {
                type: 'string',
                description: 'Last message in the application instance'
            }
        },
        associations: {
            app: {
                type: 'Application',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    create: {
                        Initializing: {}
                    }
                }
            },
            Initializing: {
                events: {
                    provisoned: {
                        Running: {}
                    }
                }
            },
            Running: {
                events: {
                    kill: {
                        Stopping: {}
                    }
                }
            },
            Stopping: {
                events: {
                    stopped: {
                        Stopped: {}
                    }
                }
            },
            Stopped: {
                events: {
                    exit: {
                        Exit: {}
                    },
                    failed: {
                        Failed: {}
                    }
                }
            },
            Exit: {
            },
            Failed: {
            }
        },
        view: {
            color: "#00aaff",
            object2d: (options) => {
                // Triangle
                let material = {color: "#00aaff", border: "#000000"};
                if (options) {
                    material = options;
                }

                return `<rect width="10" height="10"style="fill:${material.color};stroke:${material.border};stroke-width:1" />` +
                    `<circle cx="0" cy="0" r=4 style="fill:#dddddd;stroke:#888888;stroke-width:1" />`;
            },
            object3d: (options) => {

                let materials = {
                    '': `color:#00aaff; transparent:true; opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true; opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true; opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true; opacity:0.90;`
                };
                let retval = "";
                for (let i in materials) {
                    retval += `<a-entity id="ApplicationInstance3D${i}">` +
                        `<a-box width="20" height="20" depth="20" material="${materials[i]}" ></a-box>` +
                        `<a-sphere radius="8" position="0 0 8" material="color:white; transparent:true;opacity:0.60" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = ApplicationInstance;

