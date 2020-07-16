
class Environment {
    static definition = {
        name: 'Environment',
        description: 'An environment represents a group of clouds, and policies that service are deployed. ' +
            'Examples of environments are development, test, production',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the environment'
            }
        },
        associations: {
            clouds: {
                type: 'MultiCloud',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            policies: {
                type: 'PolicyCollection',
                cardinality: 1,
                composition: false,
                owner: false
            }
        },
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        Enabled: { }
                    }
                }
            },
            Enabled: {
                description: "Environment is available to be used",
                events: {
                    disable: {
                        Disabled: { }
                    }
                }
            },
            Disabled: {
                description: "Environment is not available to be used",
                events: {
                    enable: {
                        Enabled: { }
                    }
                }
            }
        },
        view: {
            color: "#aaffaa",
            object2d: (options) => {
                // Triangle
                let material = {color: "#aaffaa", border: "#000000"};
                if (options) {
                    material = options;
                }
                return `<rect x="-15" y="-15" width="30" height="30" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;

            },
            object3d: (options) => {
                let materials = {
                    '': `color:#ffffaa; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Environment3D${i}">` +
                        `<a-box depth="5" width="30" height="30" ` +
                        `material='${materials[i]}' ></a-box-knot>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Environment;

