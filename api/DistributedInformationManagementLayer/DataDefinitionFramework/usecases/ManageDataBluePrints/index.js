/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Blue Prints',
    description: 'Manage Data Blue Prints is the description',
    method: 'datablueprint/list',
    actors: {
        'Data Engineer': 'uses',
        'Data Scientist': 'uses',
    },
    extends: [ "Provide Business Information"]
};

