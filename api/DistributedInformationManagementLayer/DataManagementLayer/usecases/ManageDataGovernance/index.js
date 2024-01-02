/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Governance',
    description: 'Manage Data Governance is the description',
    method: 'data/govern',
    actors: {
        'Chief Data Officer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

