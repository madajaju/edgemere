/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Instances',
    description: 'Manage Data Instances is the description',
    method: 'datainstance/list',
    actors: {
        'DataScientist': 'uses',
        'ApplicationDeveloper': 'uses'
    },
    extends: [ "Provide Business Information"]
};

