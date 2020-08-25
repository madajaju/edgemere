
class LineageMetaData {
    static definition = {
        name: 'LineageMetaData',
        description: 'This class is a meta-data class that stores the lineage of the Data Instance. The creation' +
            ' action is stored in the class along with the lineage of the the data instance.',
        extends: 'MetaData',
        attributes: {
            creationAction: {
                type: 'string',
                description: 'Description of the creation',
            }
        },
        associations: {
            parents: {
                type: 'DataInstance',
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

                return `<path d="m -8 -10 l 6 4 l -2 7 l -7 0 l -2 -7 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
                    `<path d="m 4 -2 l 6 4 l -2 7 l -7 0 l -2 -7 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
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
                    retval += `<a-entity id="LineageMetaData3D${i}">` +
                        `<a-dodecahedron radius="6" segments-height="5" segments-radial="5" position="8 8 8" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-dodecahedron radius="6" segments-height="5" segments-radial="5" position="-8 -8 -8" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-box width="26" height="26" depth="26" position="0 0 0" material="color:#cccccc;transparent:false;wireframe:true;" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = LineageMetaData;

