
class PLC {
    static definition = {
        name: 'PLC',
        extends: 'CommunicationPathway',
        description: 'Programmable Logic Controller',
        attributes: {
            name: {
                type: 'string',
                description: 'description'
            },
            kind: {
                type: 'string',
                description: 'description'
            }
        },
        associations: {
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

module.exports = PLC;

