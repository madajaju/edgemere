
class LedgerEntry {
    static definition = {
        name: 'LedgerEntry',
        description: 'An entry in the build ledger',
        attributes: {
            time: {
                type: 'string',
                description: 'Timestamp of the ledger entry',
            },
            message: {
                type: 'string',
                description: 'Message for the ledger entry'
            }
        },
        associations: {
            step: {
                type: 'StepInstance',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            input: {
                type: 'Artifact',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            output: {
                type: 'Artifact',
                cardinality: 'n',
                composition: false,
                owner: false,
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

module.exports = LedgerEntry;

