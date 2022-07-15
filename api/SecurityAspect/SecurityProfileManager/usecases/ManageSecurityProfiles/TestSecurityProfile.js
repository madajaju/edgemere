module.exports = {
    name: 'Test Security Profile',
    description: 'Test Security Profile if the profile has conflicting policies and if the profile conflicts with' +
        ' other profiles in the system and when it is attached.',
    method: "securityprofile/test",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfileTSP1', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/create', parameters: {name:'secProfileTSP2', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/create', parameters: {name:'secProfileTSP3', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/test', parameters: {name:'secProfileTSP1'}}
    ]
};

