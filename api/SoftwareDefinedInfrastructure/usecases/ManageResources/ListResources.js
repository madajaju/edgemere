module.exports = {
    name: 'List Resources',
    description: 'List Resources and their utilization numbers. This is used for capacity planning.',
    method: "resource/list",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action:'device/create', parameters: {name: 'hostlr1', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostlr2', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostlr3', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostlr4', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostlr5', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostlr6', file:'./templates/device.yaml' }},
        {action:'datacenter/create', parameters: {name: 'dclr1'}},
        {action:'datacenter/adddevices', parameters: {name: 'dclr1', items:'hostlr1,hostlr2,hostlr3,hostlr4,hostlr5,hostlr6'}},
        {action:'cloud/create', parameters: {name: 'cloudlr1'}},
        {action:'cloud/adddatacenters', parameters: {name: 'cloudlr1', items: 'dclr1'}},
        {action:'datacenter/disable', parameters: {name: 'dclr1'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes', cloud:'cloudlr1', requirements: './templates/requirements.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes2', cloud:'cloudlr1', requirements: './templates/requirements2.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes3', cloud:'cloudlr1', requirements: './templates/requirements3.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes4', cloud:'cloudlr1', requirements: './templates/requirements.yaml'}},
    ]
};

