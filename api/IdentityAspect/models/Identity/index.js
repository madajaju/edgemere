
class Identity {
    static definition = {
        name: 'Identity',
        description: 'Identity of the entity in the system',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the identity',
            },
            username: {
                type: 'string',
                description: 'UserName of the identity',
            },
            password: {
                type: 'string',
                description: 'Password of the identity',
            },
            cert: {
                type: 'string',
                description: 'Certificate of the identity',
            }
        },
        associations: {
            /* assoc1: {
                type: 'ModelName',
                cardinality: 1,
                composition: false,
                owner: false,
            },
             */
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

module.exports = Identity;

