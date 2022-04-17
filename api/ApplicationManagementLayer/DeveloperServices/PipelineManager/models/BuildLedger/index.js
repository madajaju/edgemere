
class BuildLedger {
    static definition = {
        name: 'BuildLedger',
        description: 'The Build Ledger contains a list of the steps performed during the build including the' +
            ' artifacts that went into the step.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the ledger',
            }
        },
        associations: {
            entries: {
                type: 'LedgerEntry',
                cardinality: 'n',
                composition: true,
                owner: true,
            },
            parent: {
                type: 'BuildInstance',
                cardinality: 1,
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

module.exports = BuildLedger;

