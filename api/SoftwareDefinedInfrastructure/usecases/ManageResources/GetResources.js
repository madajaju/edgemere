module.exports = {
    name: 'Get Resources',
    description: 'Get Resources based on a set of requirements, this could be one resource or a set of ' +
        'resources. Requires a cloud and requirements to be specified. A name for the resources can be requested.',
    method: "resource/get",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action:'device/create', parameters: {name: 'hostgr1', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostgr2', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostgr3', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostgr4', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostgr5', file:'./templates/device.yaml' }},
        {action:'device/create', parameters: {name: 'hostgr6', file:'./templates/device.yaml' }},
        {action:'datacenter/create', parameters: {name: 'dcgr1'}},
        {action:'datacenter/adddevices', parameters: {name: 'dcgr1', items:'hostgr1,hostgr2,hostgr3,hostgr4,hostgr5,hostgr6'}},
        {action:'cloud/create', parameters: {name: 'cloudgr1'}},
        {action:'cloud/adddatacenters', parameters: {name: 'cloudgr1', items: 'dcgr1'}},
        {action:'datacenter/disable', parameters: {name: 'dcgr1'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes', cloud:'cloudgr1', requirements: './templates/requirements.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes2', cloud:'cloudgr1', requirements: './templates/requirements2.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes3', cloud:'cloudgr1', requirements: './templates/requirements3.yaml'}},
        {action:'sdi/resource/get', parameters: {name: 'myRes4', cloud:'cloudgr1', requirements: './templates/requirements.yaml'}},
    ]
};

