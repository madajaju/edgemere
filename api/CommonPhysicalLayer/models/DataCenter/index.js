
class DataCenter {
    static definition = {
        name: 'DataCenter',
        description: 'This represent the physical data center and contains several devices',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Datacenter'
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'datacenter'
            },
            adevices: {
                type: 'AggregatedDevice',
                cardinality: 'n',
                composition: false,
                owner: true,
                unique: true,
                via: 'datacenter'
            },
        },

    }
}

module.exports = DataCenter;

