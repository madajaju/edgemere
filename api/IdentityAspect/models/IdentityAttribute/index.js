
class IdentityAttribute {
    static definition = {
        name: 'IdentityAttribute',
        description: 'IdentityAttributes enable attribute based access controls. A User has attributes defined name' +
            ' value pairs that are then used to define policies for accessing resources, data, and applications',
        attributes: {
            name: {
                type: 'string',
                description: 'name of the attribute'
            },
            value: {
                type: 'string',
                description: 'Value of the attribute'
            }
        },
        associations: {
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

module.exports = IdentityAttribute;

