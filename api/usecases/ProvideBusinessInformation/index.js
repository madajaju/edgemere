/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Provide Business Information',
    description: 'Provide Business Information is the description',
    method: 'data/govern',
    actors: {
        'DataAnalyst': 'uses',
        'DataEngineer': 'uses',
        'DataScientist': 'uses',
        'DataSteward': 'uses',
        'ChiefDataOfficier': 'uses'
    },
    // Shows dependency
    // includes: ["UseCase Name"],
    // Show Aggreation from a super use case
    // extends: ["UseCase Name"],
};

