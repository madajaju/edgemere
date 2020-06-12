class Policy {
    static definition = {
        name: 'Policy',
        description: 'policy can be applied to any entity in the system including Applications, Stacks, Resource, Devices, ...',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the policy',
            }
        },
        associations: {
            owner: {
                type: 'PolicyCollection',
                cardinality: 1,
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

module.exports = Policy;

