/**
 * usecase.js
 *
 * @description :: This is a collection of scenarios that are mapped to nodejs machines.
 */

module.exports = {
    name: 'Manage Security Profiles',
    description: 'Manage Security Profiles allows the security engineer to create, updated, and destroy security' +
        ' profiles in the system. Security profiles are attached to identity elements in the system and enforce' +
        ' security policies contained in the profiles.',
    method: 'securityprofile/list',
    actors: {
        'SecurityEngineer': 'uses'
    },
    extends: ["Secure Assets"]
};

