
class DataProcedure {
    static definition = {
        name: 'DataProcedure',
        description: 'Procedure run on the Data Source',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the procedure',
            }
        },
        associations: {
            pipeline: {
                type: 'DataPipeline',
                cardinality: 1,
                composition: false,
                owner: false,
            },
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

module.exports = DataProcedure;

