/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Find Resources',
    description: 'Find Resources is the description',
    method: 'resources/find',
    actors: {
        'IT Operations': 'uses'
    },
};

