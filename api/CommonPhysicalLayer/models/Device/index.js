
class Device {
    static definition = {
        name: 'Device',
        description: 'Representation of a device in a datacenter',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the device'
            },
            ename: {
                type: 'string',
                description: 'Extended Name of the device'
            },
            type: {
                type: 'string',
                description: 'Type of the Device'
            }
        },
        associations: {
            profile: {
                type: 'PhysicalProfile',
                cardinality: 1,
                composition: true,
            },
            hardware: {
                type: 'Hardware',
                cardinality: 'n',
                composition: false,
                owner: true,
                via: 'device'
            },
            datacenter: {
                type: 'DataCenter',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            parent: {
                type: 'AggregatedDevice',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    create: {
                        Enabled: {}
                    },
                    reserve: {
                        Enabled: {}
                    }
                }
            },
            Enabled: {
                events: {
                    disable: {
                        Disabled: {}
                    }
                }
            },
            Disabled: {
                events: {
                    enable: {
                        Enabled: {}
                    }
                }
            }
        }
    }
}

module.exports = Device;

