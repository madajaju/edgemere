
class DataBluePrint {
    static definition = {
        name: 'DataBluePrint',
        description: 'Data Blue Print allows a Data Scientist to describe how to manage data',
        attributes: {
            name: {
                type: 'string',
                description: 'name of the data blue print',
            },
            version: {
                type: 'string',
                description: 'name of the data blue print',
            }
        },
        associations: {
            adaptors: {
                type: 'DataAdaptorTemplate',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'blueprint'
            },
            identity: {
                type: 'Identity',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            flows: {
                type: 'DataFlowTemplate',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'blueprint'
            },
            instances: {
                type: 'DataBluePrintInstance',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'blueprint'
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
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<rect width="30" height="30" x="-15" y="-15" style="fill:#aaaaff;stroke:black;stroke-width:1;" />` +
                    `<rect width="20" height="3" x="-10" y="2" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<path d="m -10 -2 l 6 4 l -2 7 l -7 0 l -2 -7 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<path d="m 8 -2 l 6 4 l -2 7 l -7 0 l -2 -7 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` ;
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
                    retval += `<a-entity id="DataBluePrint3D${i}">` +
                        `<a-box width="35" height="30" depth="1" material='color:#aaaaff; transparent:false;'></a-box>`+
                        `<a-dodecahedron radius="5" segments-height="5" segments-radial="5" position="-5 5 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-cylinder radius="3" height="15" rotation="90 -90 0" position="5 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-dodecahedron radius="5" segments-height="5" segments-radial="5" position="0 -10 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataBluePrint;

