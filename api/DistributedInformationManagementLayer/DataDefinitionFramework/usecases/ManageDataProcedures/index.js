/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Procedures',
    description: 'Manage Data Procedures is the description',
    method: 'dataprocedure/list',
    actors: {
        'Data Engineer': 'uses',
        'Chief Data Officer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

