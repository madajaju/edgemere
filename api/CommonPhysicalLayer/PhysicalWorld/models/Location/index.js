
class Location {
    static definition = {
        name: 'Location',
        description: 'Description ',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Location',
            },
            lat: {
                type: 'number',
                description: 'Latitude of the Location'
            },
            long: {
                type: 'number',
                description: 'Longitude of the Location'
            },
            alt: {
                type: 'number',
                description: 'Altitude of the Location'
            },
            address: {
                type: 'string',
                description: 'Address of the Location'
            },
            notes: {
                type: 'string',
                description: 'Address of the Location'
            },
        },
        associations: {
            assets: {
                type: 'Asset',
                cardinality: 'n',
                composition: false,
                owner: true,
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

module.exports = Location;

