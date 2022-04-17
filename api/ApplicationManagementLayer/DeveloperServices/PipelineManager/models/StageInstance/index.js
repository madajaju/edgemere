
class StageInstance {
    static definition = {
        name: 'StageInstance',
        description: 'Description ' +
            'long description',
        attributes: {
            attr1: {
                type: 'string',
                description: 'description' +
                    ' long description'
            }
        },
        associations: {
            build: {
                type: 'BuildInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            definition: {
                type: 'Stage',
                cardinality: 1,
            },
            steps: {
                type: 'StepInstance',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'definition'
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

module.exports = StageInstance;

