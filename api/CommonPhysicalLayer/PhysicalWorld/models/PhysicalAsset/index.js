
class PhysicalAsset {
    static definition = {
        name: 'PhysicalAsset',
        description: 'Description ',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the the physical asset',
            },
            assetType: {
                type: 'string',
                description: "The Type of Asset",
            },
        },
        associations: {
            location: {
                type: 'Location',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            sensor: {
                type: 'Sensor',
                cardinality: 'n',
                composition: true,
                owner: true
            },
            pathway: {
                type: "CommunicationPathway",
                cardinality: 'n',
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

module.exports = PhysicalAsset;

