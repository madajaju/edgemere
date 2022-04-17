
class DataAdaptor {
    static definition = {
        name: 'DataAdaptor',
        description: 'The Data Adaptor is the mechanism that is a proxy to the data in the physical form.' +
            ' For example there is a Data Adaptor for a filesystem, SQL database, or a data stream. Data Adaptors' +
            ' handle the ingestion of the data, management of the data, and access to the data.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the adaptor',
            }
        },
        associations: {
            blueprint: {
                type: 'DataBluePrint',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            sources: {
                description: 'The Data Sources of the Adapator',
                type: 'DataSource',
                cardinality: 'n',
                composition: false,
                owner: true,
            },
            instances: {
                description: 'Instance of a DataAdaptor',
                type:'DataAdaptorInstance',
                cardinality: 'n',
                composition: false,
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
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<path d="m -3 8 l 10 15 l -20 0 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />` +
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
                    retval += `<a-entity id="DataAdaptor3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-cone radius-bottom="10" height="10" rotation="0 90 0" position="0 -10 0" material='${materials[i]}' ></a-cone>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataAdaptor;

