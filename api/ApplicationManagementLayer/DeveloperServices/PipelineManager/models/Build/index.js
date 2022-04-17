
class Build {
    static definition = {
        name: 'Build',
        description: 'Build of the application or service contains the steps performed in each stage of development',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the build',
            },
            tag: {
                type: 'string',
                description: 'Tag of the build'
            }
        },
        associations: {
            ledger: {
                type: 'BuildLedger',
                cardinality: 1,
                composition: false,
                owner: true
            },
            stages: {
                type: 'StageInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            deliverables: {
                type: 'Deliverable',
                cardinality: 'n',
                composition: false,
                owner:true,
                via: 'parent'
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

module.exports = Build;

