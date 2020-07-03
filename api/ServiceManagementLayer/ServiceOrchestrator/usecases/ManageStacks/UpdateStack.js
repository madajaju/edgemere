module.exports = {
    name: 'Update Stack',
    description: 'Update Stack allows the DevOps Engineer to update the stack after it has been deployed.' +
        ' This can include policies changes in the environment, updates to the stack definition, service' +
        ' definitions, or environmental changes.',
    method: "stack/update",
    actors: {
        'DevOps Engineer': 'uses',
    },
};

