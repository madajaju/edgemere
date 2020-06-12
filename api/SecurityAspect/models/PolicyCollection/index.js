
class PolicyOwner {
    static definition = {
        name: 'PolicyCollection',
        description: 'Any entity that has policies should have a Policy Collection association',
        attributes: {
        },
        associations: {
            policies: {
                type: 'Policy',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'owner',
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

module.exports = PolicyOwner;

