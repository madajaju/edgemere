module.exports = {
    name: 'Enable Environment',
    description: 'IT Operations has the ability to enable an environment to manage services',
    method: "environment/enable",
    actors: {
        'IT Operations': 'uses',
    },
};

