
class Step {
    static definition = {
        name: 'Step',
        description: 'This is a step in the stage of the build.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the step',
            },
            action: {
                type: 'string',
                description: 'Action to perform for the step.'
            }
        },
        associations: {
            stage: {
                type: 'Stage',
                cardinality: 1,
                composition: false,
            },
            instances: {
                type: 'StepInstance',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'step'
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

module.exports = Step;

