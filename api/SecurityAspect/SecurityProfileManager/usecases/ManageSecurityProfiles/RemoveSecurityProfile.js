module.exports = {
    name: 'Remove Security Profile',
    description: 'Remove Security Profile that is attached to multiple identities. All identities should be' +
        ' re-evaluated when a profile is destroyed.',
    method: "securityprofile/destroy",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfileRSP', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/destroy', parameters: {name:'secProfileRSP'}}
    ]
};

