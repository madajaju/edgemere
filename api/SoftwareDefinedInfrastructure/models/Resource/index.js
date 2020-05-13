
class Resource {
    static definition = {
        name: 'Resource',
        description: 'Resource in the cloud. Can be network, storage or compute.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource'
            },
            ename: {
                type: 'string',
                description: 'Extended name of the resource'
            },
            disabled: {
                type: 'boolean',
                description: 'Disabled Resource'
            },
            type: {
                type: 'string',
                description: 'Type of resource, Network, Storage, Compute or Accelerator'
            },
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: '1',
                composition: true,
                owner: true,
            },
            hardware: {
                type: 'Hardware',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            instances: {
                type: 'ServiceInstance',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            cloud: {
                type: 'Cloud',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    provision: {
                        Provisioning: {}
                    },
                    disable: {
                        Disabled: {}
                    }
                }
            },
            Provisioning: {
                events: {
                    finishedProvision: {
                        Ready: {}
                    },
                    failedProvision: {
                        Failed: {}
                    }
                }
            },
            Failed: {
            },
            Ready: {
                events: {
                    disable: {
                        Disabled: {}
                    },
                }
            },
            Disabled: {
            }
        }
    }
}
module.exports = Resource;

