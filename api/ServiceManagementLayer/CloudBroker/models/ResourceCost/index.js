
class ResourceCost {
    static definition = {
        name: 'ResourceCost',
        description: 'Cost of the Resource',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the cost of the resource',
            },
            amount: {
                type: 'number',
                description: 'Amount of the cost',
            },
            units: {
                type: 'string',
                description: 'Unit of measure',
            }
        },
        associations: {
            parent: {
                type: 'ResourceInstanceType',
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

module.exports = ResourceCost;

