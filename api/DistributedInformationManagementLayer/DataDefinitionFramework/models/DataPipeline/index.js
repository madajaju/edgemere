
class DataPipeline {
    static definition = {
        name: 'DataPipeline',
        description: 'Data Pipeline describes a pipeline to process a data source.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the data pipeline',
            }
        },
        associations: {
            procedures: {
                type: 'DataProcedure',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'pipeline'
            },
            flows: {
                type: 'DataFlow',
                cardinality: 'n',
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

module.exports = DataPipeline;

