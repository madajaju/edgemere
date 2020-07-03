module.exports = {
    name: 'Delete Environment',
    description: 'Delete Environment allows IT Operations to delete an environment and suspend all services' +
        ' running in the environment.',
    method: "environment/destroy",
    actors: {
        'IT Operations': 'uses',
    },
};

