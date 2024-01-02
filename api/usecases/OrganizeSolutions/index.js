/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Organize Solutions',
    description: 'Organize Solutions is the description',
    method: 'data/govern',
    actors: {
        'ApplicationDeveloper': 'uses',
        'DevOpsEngineer': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

