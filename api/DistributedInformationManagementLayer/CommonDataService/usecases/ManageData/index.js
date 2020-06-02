/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data',
    description: 'Manage Data is the description',
    method: 'data/list',
    actors: {
        'Data Scientist': 'uses',
        'Data Analyst': 'uses',
        'Data Engineer': 'uses',
    },
};

