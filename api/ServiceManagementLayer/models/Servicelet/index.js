class Servicelet {
    static definition = {
        name: 'Servicelet',
        description: 'Servicelet is the combination of a Service with the environment. This gives the ability to have  ' +
            'a service that behaves differently depending on the environment it resides.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Servicelet',
            },
            args: {
                type: 'json',
                description: 'Names Argument list [ {name: value} ]',
            },
            replicas: {
                type: 'number',
                description: 'Number of replicas to run',
            },
            ports: {
                type: 'json',
                description: 'Port Mappings ####:####',
            }
        },
        associations: {
            resources: {
                description: 'resource requests for the servicelet',
                type: 'Resource',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            stacklet: {
                description: 'Parent stacklet for the servicelet',
                type: 'Stacklet',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            service: {
                description: 'Service for the servicelet',
                type: 'Service',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            env: {
                description: 'Environment for the Servicelet',
                type: 'Environment',
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

module.exports = Servicelet;

