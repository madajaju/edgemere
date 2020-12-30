module.exports = {
    name: 'Manage Data Center',
    description: 'Manage Data Center is the description',
    method: "data/source",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action: 'device/create', parameters: {name: 'hostmdc1', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmdc2', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmdc3', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmdc4', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmdc5', file: './templates/device.yaml'}},
        {action: 'aggregateddevice/create', parameters: {name: 'admdc1'}},
        {action: 'aggregateddevice/create', parameters: {name: 'admdc2'}},
        {action: 'aggregateddevice/adddevices', parameters: {name: 'admdc1', items: 'hostmdc1,hostmdc2'}},
        {action: 'aggregateddevice/adddevices', parameters: {name: 'admdc2', items: 'hostmdc3,hostmdc4'}},
        {action: 'datacenter/create', parameters: {name: 'dcmdc1'}},
        {action: 'datacenter/adddevices', parameters: {name: 'dcmdc1', items: 'hostmdc1,hostmdc2'}},
        {action: 'datacenter/adddevices', parameters: {name: 'dcmdc1', items: 'admdc2'}},
        {action: 'datacenter/disable', parameters: {name: 'dcmdc1'}},
        {action: 'datacenter/enable', parameters: {name: 'dcmdc1'}},
    ]
};

