
class ResourceMap {
    static definition = {
        name: 'ResourceMap',
        description: 'This maps generalized resource name/requirement to one or more requirements for the specific ' +
            'cloud resource.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource reference',
            }
        },
        associations: {
            value: {
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

module.exports = ResourceMap;

