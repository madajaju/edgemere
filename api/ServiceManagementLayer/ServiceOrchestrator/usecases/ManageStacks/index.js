/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Stacks',
    description: 'Manage Stacks allows the stack developer to create, update, and delete stacks.',
    method: 'stack/list',
    actors: {
        'Stack Developer': 'uses',
        'Application Developer': 'uses'
    },
    extends: [ "Control Virtual Infrastructure"]
};

