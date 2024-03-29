
class ServiceDefinition {
    static definition = {
        name: 'ServiceDefinition',
        description: 'This represents the definition of a service to be used to create a service',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the service definition',
            }
        },
        associations: {
            /*
            assoc1: {
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

module.exports = ServiceDefinition;

