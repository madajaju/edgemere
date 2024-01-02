/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Coordinate Services',
    description: 'Coordinate Services is the description',
    method: 'service/list',
    actors: {
        'StackDeveloper': 'uses',
        'ITOperations': 'uses',
        'DevOpsEngineer': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

