module.exports = {
    name: 'Enable Security Profile',
    description: 'Enable Security Profile should force a re-evaluation of the policies on all of the attached' +
        ' identities in the system.',
    method: "securityprofile/enable",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfileESP', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/disable', parameters: {name:'secProfileESP'}},
        { action: 'securityprofile/enable', parameters: {name:'secProfileESP'}}
    ]
};

