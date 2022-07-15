module.exports = {
    name: 'Attach Profile',
    description: 'Attach Profile is the description',
    method: "securityprofile/attach",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfile1', file:'./templates/secprofile.yml'}},
        { action: 'identity/create', parameters: {name:'ID1', file:'./templates/identity.yml'}},
        { action: 'securityprofile/deploy', parameters: {name:'secProfile1'}},
        { action: 'securityprofile/attach', parameters: {profile:'secProfile1', identity:'ID1'}}
    ]
};

