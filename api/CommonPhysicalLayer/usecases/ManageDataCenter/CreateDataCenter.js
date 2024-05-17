module.exports = {
    name: 'Create Data Center',
    description: 'IT Operator creates data centers and allows them to add devices and aggregated devices',
    method: 'datacenter/create',
    given: "IT Operator has access to the system.",
    when: "Operator creates a data center, devices, and aggregated devices",
    then: "Data center and devices are created, added and embedded successfully",
    actors: {
        'IT Operations': 'uses',
    },
    steps: [
        {action: 'device/create', parameters: {name: 'host1', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'host2', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'host3', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'host4', file: './templates/device.yaml'}},
        {action: 'device/create', parameters: {name: 'host5', file: './templates/device.yaml'}},
        {action: 'aggregateddevice/create', parameters: {name: 'ad1'}},
        {action: 'aggregateddevice/create', parameters: {name: 'ad2'}},
        {action: 'aggregateddevice/adddevices', parameters: {name: 'ad1', items: 'host1,host2'}},
        {action: 'aggregateddevice/adddevices', parameters: {name: 'ad2', items: 'host3,host4'}},
        {action: 'datacenter/create', parameters: {name: 'dc1'}},
        {action: 'datacenter/adddevices', parameters: {name: 'dc1', items: 'host1,host2'}},
        {action: 'datacenter/adddevices', parameters: {name: 'dc1', items: 'ad2'}},
        {action: 'datacenter/disable', parameters: {name: 'dc1'}},
        {action: 'datacenter/enable', parameters: {name: 'dc1'}},
    ]
};

