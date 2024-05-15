
class CommunicationPathway {
    static definition = {
        name: 'CommunicationPathway',
        description: 'Description',
        attributes: {
            kind: {
                type: 'string',
                description: 'Type of Communication Pathway',
            },
            protocol: {
                type: 'string',
                description: 'Protocol used to communicate',
            }
        },
        associations: {
            asset: {
                type: 'PhysicalAsset',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            device: {
                type:"Device",
                cardinality: 1,
                composition: false,
                owner: false
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

module.exports = CommunicationPathway;

