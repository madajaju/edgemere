
class SourceMetaData {
    static definition = {
        name: 'SourceMetaData',
        description: 'Source Meta-Data is information about the source of the Data Instance. How to connect to the actual data.' +
            'This is used inconjunction with the Data Adaptor. For example having the ability to connect to a row,column, page or ' +
            'document in a database or filesystem.',
        extends: 'MetaData',
        attributes: {
            connection: {
                type: 'string',
                description: 'Connection string to connect to the DataInstance',
            }
        },
        associations: {
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
                return `<rect width="24" height="12" x="-16" y="12" style="fill:#cccccc;stroke:#777777;stroke-width:1" />` +
                    `<ellipse cx="-4" cy="12" rx="12" ry="5" style="fill:#cccccc;stroke:#777777;stroke-width:1" />` +
                    `<path d="m -4 -12 l 12 8 l -4 14 l -14 0 l -4 -14 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
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
                    retval += `<a-entity id="SourceMetaData3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-cylinder height="10" radius="10" position="0 -10 0" material="color:#cccccc;transparent:false;opacity:1.00;" ></a-cylinder>` +
                        `<a-box width="26" height="26" depth="26" position="0 0 0" material="color:#cccccc;transparent:false;wireframe:true;" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = SourceMetaData;

