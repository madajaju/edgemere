
class DataReference {
    static definition = {
        name: 'DataReference',
        description: 'DataReference is used to abstract data requirements for Applications, Stacks and Services.' +
            ' These references are realized in the Data Orchestrator when it creates Data Instances based' +
            ' on the policies, and environment the ServiceInstance is running.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Data Reference',
            },
            shortName: {
                type: 'string',
                description: 'Short Name of the Data Reference',
            },
            query: {
                type: 'json',
                description: 'JSON structure for finding the data in the data manager',
            },
            connection: {
                type: 'string',
                description: 'Connection string for the Data Reference',
            },
        },
        associations: {
            instances: {
                type: 'DataInstance',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'reference'
            },
            parent: {
                type: 'Servicelet',
                cardinality: 1,
                composition: false,
                owner: false,
            }
        },

        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    provision: {
                        Provisioning: { }
                    }
                }
            },
            Provisioning: {
                description: "DataReference is being Provisioned",
                events: {
                    provisioned: {
                        Provisioned: {
                        }
                    },
                    failed: {
                        FailedProvision: { }
                    }
                },
            },
            Provisioned: { },
            FailedProvision: { },
        },

        view: {
            color: "#ffcc88",
            object2d: (options) => {
                // Triangle
                let material = { color: "#ffcc88", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<path d="m -4 -12 l 12 8 l -4 14 l -14 0 l -4 -14" style="fill:${material.color};stroke:${material.border};stroke-width:1;stroke-dasharray: 3;" />`;
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
                    retval += `<a-entity id="DataReference3D${i}">` +
                        `<a-dodecahedron radius="10" segments-height="5" segments-radial="5" position="0 0 0" material='${materials[i]};wireframe:true' ></a-dodecohydon>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = DataReference;

