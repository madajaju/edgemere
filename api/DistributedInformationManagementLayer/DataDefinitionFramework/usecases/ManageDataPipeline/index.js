/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Pipeline',
    description: 'Manage Data Pipeline is the description',
    method: 'datapipeline/list',
    actors: {
        'Data Engineer': 'uses'
    },
    extends: [ "Provide Business Information"]
};

