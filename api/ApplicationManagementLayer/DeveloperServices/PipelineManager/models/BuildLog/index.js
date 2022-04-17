
class BuildLog {
    static definition = {
        name: 'BuildLog',
        description: 'This is a log for the build instance. Each log represents stdout, stderr, or nay number of' +
            ' named logs',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the log',
            },
            text: {
                type: 'string',
                description: 'Text with all of the log information. Used for in memory logs',
            },
            file: {
                type: 'string',
                description: 'Filename of were to find the log.',
            }
        },
        associations: {
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

module.exports = BuildLog;

