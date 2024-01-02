/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Multi Cloud',
    description: 'Manage Multi Cloud allows actors to create multi-clouds by adding clouds. Management of policies' +
        ' for the multi-cloud and all of the services deployed to a multi-cloud is performed by IT Operations.',
    method: 'multicloud/list',
    actors: {
        'IT Operations': 'uses'
    },
    extends: [ "Control Virtual Infrastructure"]
};

