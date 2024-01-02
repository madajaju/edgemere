/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Strategy',
    description: 'Manage Data Strategy is the description',
    method: 'datastrategy/list',
    actors: {
        'Chief Data Officer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

