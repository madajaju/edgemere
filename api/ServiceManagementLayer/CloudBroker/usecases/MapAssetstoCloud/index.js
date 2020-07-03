/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Map Assets to Cloud',
    description: 'Map Assets to Cloud allows IT Operations to map assets to resource instance types.' +
        ' The Resource Instance Type allows services to access preconfigurated configurations of resource types.',
    method: 'multicloud/mapresources',
    actors: {
        'IT Operations': 'uses'
    },
};

