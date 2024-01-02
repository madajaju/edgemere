/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Secure Assets',
    description: 'Secure Assets is the description',
    method: 'data/govern',
    actors: {
        'SecurityEngineer': 'uses',
        'SecurityOperator': 'uses',

    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

