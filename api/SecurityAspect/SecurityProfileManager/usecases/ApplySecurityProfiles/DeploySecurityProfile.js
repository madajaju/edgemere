module.exports = {
    name: 'Deploy Security Profile',
    description: 'Deploy a Security Profile against an identity in the system.',
    method: "securityprofile/deploy",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfile1', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/deploy', parameters: {name:'secProfile1'}}
    ]
};

