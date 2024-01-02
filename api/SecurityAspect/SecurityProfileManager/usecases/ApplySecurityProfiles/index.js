/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Apply Security Profiles',
    description: 'Apply Security Profiles is the description',
    method: 'data/govern',
    actors: {
        'SecurityOperator': 'uses'
    },
    extends: ["Secure Assets"]
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

