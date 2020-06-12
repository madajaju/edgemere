/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Map Assets to Cloud',
    description: 'Map Assets to Cloud is the description',
    method: 'multicloud/mapresources',
    actors: {
        'IT Operations': 'uses'
    },
};

