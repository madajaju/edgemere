/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Resources',
    description: 'Manage Resources includes creating resources, listing and planning for resources.',
    method: 'resource/list',
    actors: {
        'IT Operations': 'uses'
    },
};

