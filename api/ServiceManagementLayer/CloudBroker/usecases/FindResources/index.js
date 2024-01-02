/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Find Resources',
    description: 'Find Resources that have been allocated in the multi-cloud ecosystem.' +
        ' This should give the actor the ability to find resources based on id, name, or metrics.',
    method: 'resources/find',
    actors: {
        'IT Operations': 'uses'
    },
    extends: ["Control Virtual Infrastructure"]
};

