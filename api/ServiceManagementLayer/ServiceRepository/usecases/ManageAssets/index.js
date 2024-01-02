/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Assets',
    description: 'Manage Assets is the description',
    method: 'assets/list',
    actors: {
        'ITOperations': 'uses'
    },
    extends: [ "Control Virtual Infrastructure"]
};

