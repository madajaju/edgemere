
class BuildInstance {
    static definition = {
        name: 'BuildInstance',
        description: 'When a build is executive a BuildInstance is created to capture the logs and contains a build',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the build',
            }
        },
        associations: {
            build: {
                type: 'Build',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            stages: {
                type: 'StageInstance',
                cardinality: 'n',
                composition: false,
                owner: true,
                parent: 'build',
            },
            logs: {
                type: 'BuildLog',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'parent'
            },
            ledger: {
                type: 'BuildLedger',
                cardinality: 1,
                composition : false,
                owner : true,
                via : 'parent'
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

module.exports = BuildInstance;

