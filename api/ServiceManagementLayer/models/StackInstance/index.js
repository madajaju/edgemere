
class StackInstance {
    static definition = {
        name: 'StackInstance',
        description: 'The StackInstance is the execution of the Stack. This allows for control of the stack during execution.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the stackinstance',
            },
        },
        associations: {
            app: {
                description: 'Application Instance of the stack instance',
                type: 'ApplicationInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stack: {
                description: 'Stack of the Stack Instance',
                type: 'Stack',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stacklet: {
                description: 'Stacklet of the instance running',
                type: 'Stacklet',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            services: {
                description: 'Instances of the Services running in the Stack',
                type: 'ServiceInstance',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'stack'
            },
        },
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        Deploying: {}
                    }
                }
            },
            Deploying: {},
            Running: {},
            Failed: {},
            Completed: {},
        }
            /* Deploying: {
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

module.exports = StackInstance;

