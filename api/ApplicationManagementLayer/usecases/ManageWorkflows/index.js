/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Workflows',
    description: 'Application Developers need the ability to connect applications together through' +
        ' Workflows. This gives the organization the automate complex data interactions between' +
        ' legacy and modern applications across a hybrid infrastructure (Multi-Hybrid Cloud).',
    method: 'workflow/list',
    actors: {
        'Application Developer': 'uses'
    },
};

