/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Control Virtual Infrastructure',
    description: 'Control Virtual Infrastructure is the description',
    method: 'resource/list',
    actors: {
        'ITOperations': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

