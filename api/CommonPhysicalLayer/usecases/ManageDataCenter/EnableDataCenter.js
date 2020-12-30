module.exports = {
    name: 'Enable Data Center',
    description: 'IT Operations can enable a data center that has been disabled',
    method: "datacenter/enable",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action:'device/create', parameters: {name: 'host1', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host2', file:'./templates/device.yaml' }},
        {action:'datacenter/create', parameters: {name: 'dc1'}},
        {action:'datacenter/adddevices', parameters: {name: 'dc1', items:'host1,host2'}},
        {action:'datacenter/disable', parameters: {name: 'dc1'}},
        {action:'datacenter/enable', parameters: {name: 'dc1'}},
    ]
};

