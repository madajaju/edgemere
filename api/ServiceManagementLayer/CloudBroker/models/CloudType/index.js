class CloudType {
    static definition = {
        name: 'CloudType',
        description: 'Each Cloud has a specific type of cloud it is tied to. The ' +
            'type of cloud helps with the deployment and mapping of assets across ' +
            'the different types of clouds. Examples of Cloud types are aws,azure,vmware ' +
            'openstack, google, nutanix, ...',

        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Cloud Type',
            }
        },
        associations: {
            clouds: {
                type: 'Cloud',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            assetmap: {
                description: 'This map allows mapping normalized resource types to specific cloud resource types for this cloud type',
                type: 'ResourceMap',
                cardinality: 'n',
                composition: true,
                owner: true,
                unique: true,
            },
            instancetypes: {
                description: 'This is a list of resource types for the cloud type',
                type: 'ResourceInstanceType',
                cardinality: 'n',
                composition: true,
                owner: true,
                unique: true,
            },

            metricmap: {
                description: 'This maps metrics from the cloud to the normalized metrics',
                type: 'ResourceMap',
                cardinality: 'n',
                composition: true,
                owner: true,
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
            color: "#aaffaa",
            object2d: (options) => {
                // Triangle
                let material = {color: "#aaffaa", border: "#000000"};
                if (options) {
                    material = options;
                }

                return `<path d="M -3 -4 a 7.5 7.5 1 0 0 0 15 h 21 a 7.5 7.5 1 0 0 0 -15 a 3 3 1 0 0 -4.5 -3 a 6 6 1 0 0 -17.25 3 z"` +
                    ` style="fill:${material.color};stroke:${material.border};stroke-width:1;stroke-dasharray:3;" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#aaffaa; transparent:true, opacity:0.90; wireframe:true;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90; wireframe:true;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90; wireframe:true;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90; wireframe:true;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="CloudType3D${i}">` +
                        `<a-torus-knot radius="7" radius-tubular="10" segments-radial="64" segments-tubular="14" p="4" q="7" ` +
                        `material='${materials[i]}' ></a-torus-knot>` +
                        `</a-entity>`;
                }
                return retval;
            }
        }
    }
}

module.exports = CloudType;

