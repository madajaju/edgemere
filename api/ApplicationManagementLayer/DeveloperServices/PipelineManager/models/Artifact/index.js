
class Artifact {
    static definition = {
        name: 'Artifact',
        description: 'An artifact is a generic element that is created from a build. This could be a libraries,' +
            ' binary, vm, container image, document, or anything that is generated from the build and managed in a' +
            ' repository to be used by an application, service, stack, etc...',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the artifact',
            }
        },
        associations: {
            creator: {
                type: 'LedgerEntry',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            consumer: {
                type: 'LedgerEntry',
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

module.exports = Artifact;

