
class DataSource {
    static definition = {
        name: 'DataSource',
        description: 'DataSource represents a source of data. This could be a database, filesystem, stream of data etc..  ' +
            'It is an instanciation of a a DataAdaptor. Where the DataAdapator allows for a class of data source. ' +
            'The DataSource takes the values of the DataAdaptor and makes them real for example, a filesystem' +
            ' adaptor needs a host and a root directory in order to know how to connect to it.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Data Source',
            },
            parameters: {
                type: 'json',
                description: 'Parameters for the DataSource'
            }
        },
        associations: {
            blueprints: {
                type: 'DataBluePrintInstance',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            adaptor: {
                type: 'DataAdaptor',
                cardinality:  1,
                composition: false,
                owner: false,
            },
            data: {
                type: 'Data',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'source',
            },
            /* instances: {
                type: 'DataInstance',
                cardinality: 'n',
                composition: false,
                owner: false
            }
             */
        },
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        Ready: { }
                    }
                }
            },
            Ready: {
                description: "Data Source Ready to be used",
                events: {
                    suspend: {
                        Suspended: { }
                    },
                    shutdown: {
                        Shutdown: { }
                    },
                }
            },
            Suspended: { },
            Shutdown: { }
        },
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
                    retval += `<a-entity id="DataSource3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]}' ></a-dodecohydon>` +
                        `<a-cylinder height="10" radius="10" position="0 -10 0" material="color:#cccccc;transparent:false;opacity:1.00;" ></a-cylinder>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataSource;

