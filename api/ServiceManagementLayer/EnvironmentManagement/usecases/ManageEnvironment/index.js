/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Environment',
    description: 'Manage Environment allows the actors (IT Operations and Stack Developer) to create environments,' +
        ' and establish policies for services running in the environment.',
    method: 'environment/list',
    actors: {
        'IT Operations': 'uses',
        'Stack Developer': 'uses',
    },
};


