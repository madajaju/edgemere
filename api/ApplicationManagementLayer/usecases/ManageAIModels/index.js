/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage AI Models',
    description: 'Data Scientist manages AI models and ties them to and application and data set. ' +
        'DevOps will make sure when applications and AI models are updated that they are updated' +
        'together.',
    method: 'aimodel/list',
    actors: {
        'Data Scientist': 'uses',
        'DevOps Engineer': 'uses',
        'ApplicationDeveloper': 'uses',
        'DataEngineer': 'uses',
    },
};

