
class Sensor {
    static definition = {
        name: 'Sensor',
        description: 'Description ',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the sensor',
            },
            reading: {
                type: "string",
                description: "This is a catchall of any kind of data coming from a sensor"
            }

        },
        associations: {
            asset: {
                type: 'Asset',
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

module.exports = Sensor;

