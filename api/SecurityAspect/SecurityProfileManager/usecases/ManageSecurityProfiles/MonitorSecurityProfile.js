module.exports = {
    name: 'Monitor Security Profile',
    description: 'Monitor Security Profile allows the security engineer to monitor the status of the security' +
        ' profile. Including how many identities are enforced by the profile and how many polices are being used.',
    method: "securityprofile/status",
    actors: {
        'SecurityEngineer': 'uses',
    },
    steps: [
        { action: 'securityprofile/create', parameters: {name:'secProfileMSP', file:'./templates/secprofile.yml'}},
        { action: 'securityprofile/status', parameters: {name:'secProfileMSP'}},
    ]
};

