/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Cost Model',
    description: 'ManageCostModel allows IT Operators to manage the cost of using resources. Each cloud has different' +
        ' cost models depending on the use and the time of day they are used. Private cloud resources should have' +
        ' cost models estalbished for them as well.',
    method: 'ResourceInstanceType/list',
    actors: {
        'ITOperations': 'uses'
    },
    extends: [ "Control Virtual Infrastructure"]
};

