
class User {
    static definition = {
        name: 'User',
        description: 'User of the system',
        extends: 'Identity',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the user',
            }
        },
        associations: {
            groups: {
                type: 'Group',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            attributes: {
                type: 'IdentityAttribute',
                cardinality: 'n',
                composition: false,
                owner: false,
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

module.exports = User;

