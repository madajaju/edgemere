
class ResourceMapEntry {
    static definition = {
        name: 'ResourceMapEntry',
        description: 'Resource Map Entry allows for name value pairs to be added to the Resource Map',
        attributes: {
            name: {
                description: 'Name of the map entry',
                type: 'string',
            },
            value: {
                description: 'Value of the map entry',
                type: 'string',
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

module.exports = ResourceMapEntry;

