module.exports = {
    name: 'Create Security Profile',
    description: 'Create Security Profile from a secoprofile yaml file.',
    method: "securityprofile/create",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfile1', file:'./templates/secprofile.yml'}},
    ],
};

