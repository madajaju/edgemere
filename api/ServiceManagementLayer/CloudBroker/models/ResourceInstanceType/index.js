
class ResourceInstanceType {
    static definition = {
        name: 'ResourceInstanceType',
        description: 'This represents a resoure instance type in the different clouds.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the resource instance',
            },
            type: {
                type: 'string',
                description: 'Type of the resource instance',
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
                owner: true,
            },
            costs: {
                description: "Cost model for the Resource Instance Type",
                type: 'ResourceCost',
                unique: true,
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'parent'
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

module.exports = ResourceInstanceType;

