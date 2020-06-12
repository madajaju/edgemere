
class Stacklet {
    static definition = {
        name: 'Stacklet',
        description: 'This is a combination of the stack with a specific environment. This allows for a stack to behave ' +
            'differently depending on the envionrment it is in.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Stacklet',
            },
            version: {
                type: 'string',
                description: 'Name of the Stacklet',
            },
            parameters: {
                type: 'json',
                description: 'Parameters for the stacklet [ {name:value }]',
            }
        },
        associations: {
            stack: {
                description: 'Stack for the Stacklet',
                type: 'Stack',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            env: {
                description: 'Environment for the Stacklet',
                type: 'Environment',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            servicelets: {
                description: 'Service with environment for the Stacklet',
                type: 'Servicelet',
                cardinality: 'n',
                composition: true,
                owner:true,
                via: 'stacklet'
            },
            data: {
                description: 'Data References to the data in the Stacklet',
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner:false,
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

module.exports = Stacklet;

