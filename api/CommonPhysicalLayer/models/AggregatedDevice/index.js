class AggregatedDevice {
    static definition = {
        name: 'AggregatedDevice',
        extends: 'Device',
        description: 'This is a construct that has other devices under it',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the aggregated device'
            },
            ename: {
                type: 'string',
                description: 'Extended name of the aggregated device'
            }
        },
        associations: {
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'parent'
            },
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            datacenter: {
                type: 'DataCenter',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
    }
}

module.exports = AggregatedDevice;
