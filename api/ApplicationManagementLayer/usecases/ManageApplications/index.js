/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Applications',
    description: 'DevOps Engineers and Application Developers need the ability to manage applications across multiple environments, ' +
        'clouds, and types of infrastructure.',
    method: 'application/list',
    actors: {
        'DevOps Engineer': 'uses',
        'Application Developer': 'uses'
    },
};

