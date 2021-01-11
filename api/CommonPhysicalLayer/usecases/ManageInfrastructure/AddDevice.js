module.exports = {
    name: 'Add Device',
    description: 'Add Device is the description',
    method: "data/source",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action: 'device/create', parameters: {name: 'hostad1', file: './templates/device.yaml'}},
        {action: 'cpl/device/disable', parameters: {name: 'hostad1'}},
        {action: 'cpl/device/enable', parameters: {name: 'hostad1'}},
        {action: 'cpl/device/disable', parameters: {name: 'hostad1'}},
    ]
};

