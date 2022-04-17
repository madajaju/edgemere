
class StackDefinition {
    static definition = {
        name: 'StackDefinition',
        description: 'A Stack is an aggregation of services in one context. The Stack can have any number ' +
            'of Services and has a stacklet for each environment in the system. Application typically ' +
            'have 1 or more stacks to define their applications.',
        attributes: {
            name: {
                description: 'Name of the stack',
                type: 'string',
            },
            version: {
                description: 'Version of the stack',
                type: 'string',
            },
            parameters: {
                description: 'Parameters of the stack [ {name:value} ]',
                type: 'json',
            },
        },
        associations: {
            stacklets: {
                description: 'Stacklets of the stack and environment',
                type: 'Stacklet',
                cardinality: 'n',
                unique: true,
                composition: true,
                owner: true,
                via: 'stack'
            },
            stacks: {
                description: 'Services of the stack',
                type: 'StackDefinition',
                cardinality: 'n',
                unique: true,
                composition: true,
                owner: true,
                via: 'parent'
            },
            parent: {
                description: 'Services of the stack',
                type: 'StackDefinition',
                cardinality: 1,
            },
            services: {
                description: 'Services of the stack',
                type: 'ServiceDefinition',
                cardinality: 'n',
                unique: true,
                composition: true,
                owner: true,
                via: 'stack'
            },
            data: {
                description: 'Data for the stack',
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner: true,
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

module.exports = StackDefinition;

