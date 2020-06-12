
class Service {
    static definition = {
        name: 'Service',
        description: 'A Service is an orchestratable element that represents a container or vm running against a ' +
            'resource. The actual execution of the service is tracked by the ServiceInstance. A stack is made up ' +
            'of multiple services.',

        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Service',
            },
            version: {
                type: 'string',
                description: 'Version of the Service',
            },
            ports: {
                type: 'json',
                description: 'List of ports internally'
            },
            expose: {
                type: 'json',
                description: 'List of ports to expose'
            },
            parameters: {
                type: 'json',
                description: '[ {name: value} ] - Lsit of parameters for the service'
            },
        },
        associations: {
            stack: {
                description: 'Parent Stack of the service',
                type: 'Stack',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            servicelets: {
                description: 'Servicelets of the service (Environment)',
                type: 'Servicelet',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'service'
            },
            children: {
                description: 'Child services of the service',
                type: 'Service',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            parent: {
                description: 'Parent of the service',
                type: 'Service',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            policies: {
                description: 'Policies of the Service',
                type: 'Policy',
                cardinality: 'n',
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

module.exports = Service;

