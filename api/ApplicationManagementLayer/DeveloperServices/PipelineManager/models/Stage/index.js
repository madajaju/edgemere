
class Stage {
    static definition = {
        name: 'Stage',
        description: 'Stage of the pipeline contains steps to be performed in an environment',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the stage',
            }
        },
        associations: {
            instances: {
                type: 'StageInstance',
                cardinality: 'n'
            },
            steps: {
                type: 'Step',
                cardinality: 'n',
                composition: true,
                owner: true,
            },
            environment: {
                type: 'Environment',
                cardinality: 1,
                composition: false,
                owner: false
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

module.exports = Stage;

