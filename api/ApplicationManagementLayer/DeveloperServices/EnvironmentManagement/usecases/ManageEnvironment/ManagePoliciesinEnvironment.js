module.exports = {
    name: 'Manage Policies in Environment',
    description: 'IT Operations adds and removes policies from the environment',
    method: "environment/addpolicies",
    actors: {
        'IT Operations': 'uses',
    },
};

