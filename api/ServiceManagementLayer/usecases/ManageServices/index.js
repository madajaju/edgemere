/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Services',
    description: 'Manage Services is the description',
    method: 'service/list',
    actors: {
        'Stack Developer': 'uses',
        'Application Developer': 'uses'
    },
    extends: ["CoordinateServices"]
};

