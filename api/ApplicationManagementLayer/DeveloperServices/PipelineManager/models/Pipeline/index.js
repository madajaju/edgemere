
class Pipeline {
    static definition = {
        name: 'Pipeline',
        description: 'A pipeline builds, tests, and deploys applications and services in the system',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the pipeline',
            }
        },
        associations: {
            stages: {
                type: 'Stage',
                cardinality: 'n',
                composition: true,
                owner: true,
            },
            builds: {
                type: 'Build',
                cardinality: 'n',
                composition: false,
                owner: true,
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

module.exports = Pipeline;

