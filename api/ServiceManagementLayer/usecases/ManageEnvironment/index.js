/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Environment',
    description: 'Manage Environment is the description',
    method: 'environment/list',
    actors: {
        'IT Operations': 'uses',
        'Stack Developer': 'uses',
    },
};

