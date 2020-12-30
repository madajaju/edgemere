module.exports = {
    name: 'Remove Data Center',
    description: 'IT Operations can remove a Data Center and all of its devices and aggregated devices',
    method: "datacenter/remove",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action:'device/create', parameters: {name: 'host1', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host2', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host3', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host4', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'host5', file:'./templates/device.yaml' }},
        {action:'aggregateddevice/create', parameters: {name: 'ad1'}},
        {action:'aggregateddevice/adddevices', parameters: {name: 'ad2', items:'host3,host4'}},
        {action:'datacenter/create', parameters: {name: 'dc1'}},
        {action:'datacenter/adddevices', parameters: {name: 'dc1', items:'host1,host2'}},
        {action:'datacenter/adddevices', parameters: {name: 'dc1', items:'ad1'}},
        {action:'datacenter/destroy', parameters: {name: 'dc1'}}
    ]
};

