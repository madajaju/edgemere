/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Clouds',
    description: 'Manage Clouds is the description',
    method: 'Cloud/list',
    actors: {
        'IT Operations': 'uses'
    },
};

