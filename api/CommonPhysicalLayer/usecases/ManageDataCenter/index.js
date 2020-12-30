/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Data Center',
    description: 'IT Operations manages data centers by creating, deleting, enabling and disabling devices' +
        'and aggregated devices',
    method: 'datacenter/list',
    actors: {
        'IT Operations': 'uses'
    },
};

