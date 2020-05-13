module.exports = {
    name: 'Create Data Center',
    description: 'IT Operator creates data centers and allows them to add devices and aggregated devices',
    method: 'datacenter/create',
    actors: {
        'IT Operations': 'uses',
    },
};

