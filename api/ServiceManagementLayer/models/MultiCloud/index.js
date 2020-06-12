
class MultiCloud {
    static definition = {
        name: 'MultiCloud',
        description: 'Multi Cloud is an aggregation of cloud tied together with policies that services are deployed.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the multicloud'
            }
        },
        associations: {
            clouds: {
                type: 'Cloud',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            polices: {
                type: 'Policy',
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
    }
}

module.exports = MultiCloud;

