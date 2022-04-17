
class StepInstance {
    static definition = {
        name: 'StepInstance',
        description: 'This is the step instance for a step in a stage of a build. It contains all of the information' +
            ' on what happend during the execution of the build stage step.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the step instance',
            }
        },
        associations: {
            definition: {
                type: 'Step',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stage: {
                type: 'Stage',
                cardinality: 1,
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

module.exports = StepInstance;

