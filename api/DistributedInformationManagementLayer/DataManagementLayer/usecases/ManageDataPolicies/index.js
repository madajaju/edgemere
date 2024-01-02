/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Policies',
    description: 'Manage Data Policies is the description',
    method: 'datapolicy/list',
    actors: {
        'Chief Data Officer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

