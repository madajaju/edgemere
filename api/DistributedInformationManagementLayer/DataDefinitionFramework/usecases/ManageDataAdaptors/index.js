/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Adaptors',
    description: 'Manage Data Adaptors is the description',
    method: 'datadaptor/list',
    actors: {
        'Data Engineer': 'uses',
        'Data Scientist': 'uses'
    },
    extends: [ "Provide Business Information"]
};

