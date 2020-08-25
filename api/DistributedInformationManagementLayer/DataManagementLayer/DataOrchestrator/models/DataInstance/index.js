
class DataInstance {
    static definition = {
        name: 'DataInstance',
        description: 'The DataInstance class contains an instance of the data based on the data reference.' +
            ' The Instance is tied to specific service, application, or workload instance running in the system.' +
            ' This mapping of reference to instance is important in realizing the abstraction of the reference' +
            ' to something that can be used by the executable on the resources in the Softare Defined Infrastructure' +
            ' layer.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the DataInstance',
            }
        },
        associations: {
            reference: {
                type: 'DataReference',
                cardinality: 1,
                composition: false,
                owner: false
            },
            data: {
                type: 'Data',
                cardinality: 'n',
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
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="8" cy="8" r="6" style="fill:#cccccc;stroke:#666666;stroke-width:1;" />` +
                    `<path d="m -4 -12 l 12 8 l -4 14 l -14 0 l -4 -14 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
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
                    retval += `<a-entity id="DataInstance3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-sphere radius="6" position="6 6 6" material='color:#ffffff; transparent:true; opacity:0.40;' ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataInstance;

