/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Billing',
    description: 'ManageBilling allows the IT Operations Manager to establish periodic billing for the usage' +
        ' of the resources allocated for the services deployed into the cloud. The accounting and billing should' +
        ' be accessible for users and groups of users.',
    method: 'billing/list',
    actors: {
        'ITOperations': 'uses'
    },
    extends: [ "Control Virtual Infrastructure"]
};

