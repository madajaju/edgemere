module.exports = {
    name: 'Manage Aggregated Devices',
    description: 'Manage Aggregated Devices is the description',
    method: "data/source",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action: 'device/create', parameters: {name: 'hostmad1', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmad2', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'hostmad3', file: './templates/device.yaml'}},
        {action: 'aggregateddevice/create', parameters: {name: 'admad1'}},
        {action: 'aggregateddevice/adddevices', parameters: {name: 'ad1', items: 'hostmad1,hostmad2,hostmad3'}}
    ]
};

