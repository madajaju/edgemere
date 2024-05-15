/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Secure Data from Physical Asset',
    description: 'Secure Data from Physical Asset is the description',
    method: 'data/govern',
    actors: {
        'Actor': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

