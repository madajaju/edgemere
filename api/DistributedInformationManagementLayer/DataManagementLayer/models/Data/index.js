class Data {
    static definition = {
        name: 'Data',
        description: 'This class represents data that is stored in the system. It has a relationship' +
            ' with a StorageResource as all data must have someplace to reside. The access attribute' +
            ' is a catch all for how to access the data. It could be a connection string to a data like' +
            ' a database, a filesystem etc.. Specializations of the Data reference class know what to do' +
            ' with the access attribute.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Data',
            },
            access: {
                type: 'string',
                description: '* access: string - A string that represents how to access the data.' +
                    ' This could be a database connection string, file\nsystem path, etc',
            }
        },
        associations: {
            source: {
                type: 'DataSource',
                description: 'This is the DataSource that owns the data',
                cardinality: 1,
            },
            adaptor: {
                type: 'DataAdaptor',
                description: 'This is the DataAdaptor for the Data, it shows how to connect to the data',
                cardinality: 1
            },
            instances: {
                type: 'DataInstance',
                description: 'This is the Instance of the Data stored in the meta-data manager',
                cardinality: 'n',
            },
            lineage: {
                type: 'LineageMetaData',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'data',
            },
            metadata: {
                type: 'MetaData',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'data',
            },
            connection: {
                type: 'SourceMetaData',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'data',
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
                return `<path d="m -4 -12 l 12 8 l -4 14 l -14 0 l -4 -14 z" style="fill:${material.color};stroke:${material.border};stroke-width:1;" />`;
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
                    retval += `<a-entity id="Data3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = Data;

