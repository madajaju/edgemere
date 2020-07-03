module.exports = {
    name: 'Uninstall Stack',
    description: 'Uninstall Stack shuts down the stack and all of its services.',
    method: "stack/uninstall",
    actors: {
        'DevOps Engineer': 'uses',
    },
};

