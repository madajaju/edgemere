module.exports = {
    name: 'Disable Security Profile',
    description: 'Disable Security Profile that has been created. This should remove the policies enforcing the' +
        ' identity immediately. All identities effected should be re-evaluated.',
    method: "securityprofile/disable",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfileDSP', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/disable', parameters: {name:'secProfileDSP'}}
    ],
};

