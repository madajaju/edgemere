
class Deliverable {
    static definition = {
        name: 'Deliverable',
        description: 'This is the result of a build. This could be a container image, document, or library',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the deliverable from the build'
            },
            version: {
                type: 'string',
                description: 'Version of the the deliverable'
            }

        },
        associations: {
            parent: {
                type: 'BuildInstance',
                cardinality: 1,
            },
            image: {
                type: 'Image',
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

module.exports = Deliverable;

