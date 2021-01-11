module.exports = {
    name: 'Disable Data Center',
    description: 'IT Operations can disable a data center that will disable all of the devices in the data center. This can be used to test business continuity, move data center devices or decomission a data center.',
    method: "datacenter/disable",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action:'device/create', parameters: {name: 'host1', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host2', file:'./templates/device.yaml' }},
        {action:'datacenter/create', parameters: {name: 'dc1'}},
        {action:'datacenter/adddevices', parameters: {name: 'dc1', items:'host1,host2'}},
        {action:'datacenter/disable', parameters: {name: 'dc1'}},
    ]
};

