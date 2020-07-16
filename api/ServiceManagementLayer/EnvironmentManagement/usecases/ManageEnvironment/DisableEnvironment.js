module.exports = {
    name: 'Disable Environment',
    description: 'IT Operations disables an environment so services are suspended and cannot launch',
    method: "environment/disable",
    actors: {
        'IT Operations': 'uses',
    },
};

