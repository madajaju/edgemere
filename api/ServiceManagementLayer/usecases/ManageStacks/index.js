/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Stacks',
    description: 'Manage Stacks is the description',
    method: 'stack/list',
    actors: {
        'Stack Developer': 'uses',
        'Application Developer': 'uses'
    },
};

