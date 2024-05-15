/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Monitor Physical World',
    description: 'Monitor Physical World is the description',
    method: 'data/govern',
    actors: {
        'Actor': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

