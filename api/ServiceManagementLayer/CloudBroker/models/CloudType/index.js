
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
    }
}

module.exports = CloudType;

