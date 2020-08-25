
class MetaData {
    static definition = {
        name: 'MetaData',
        description: 'Meta-Data for the Data in the system. Name and Value pair.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the MetaData',
            },
            value: {
                type: 'string',
                description: 'Value of the MetaData',
            }
        },
        associations: {
            data: {
                type: 'Data',
                description: 'This is a DataInstance Class that the meta-data is tied',
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
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<path d="m -4 -12 l 12 8 l -4 14 l -14 0 l -4 -14 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<rect width="26" height="26" x="-14" y="-13" style="fill:none;stroke:#777777;stroke-width:2;stroke-dasharray:3;" />` ;
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
                    retval += `<a-entity id="MetaData3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-box width="26" height="26" depth="26" position="0 0 0" material="color:#cccccc;transparent:false;wireframe:true;" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = MetaData;

