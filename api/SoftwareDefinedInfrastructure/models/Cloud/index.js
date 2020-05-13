
class Cloud {
    static definition = {
        name: 'Cloud',
        description: 'This represents a cloud in the ecosystem. This can be public or private onprem or offprem',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the cloud',
            },
            ename: {
                type: 'string',
                description: 'Extended name of the cloud. This gives the full path to the cloud in the system',
            }

        },
        associations: {
            resources: {
                type: 'Resource',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
            devices: {
                type: 'Device',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            adevices: {
                type: 'AggregatedDevice',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            datacenters: {
                type: 'DataCenter',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            reservations: {
                type: 'Reservation',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
            requests: {
                type: 'Request',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'cloud'
            },
        },
    }
}

module.exports = Cloud;

