
module.exports = {
    name: 'Environment Deployments',
    description: 'Deploy applications into different environments such as Development, Staging, and Production.',
    method: 'undefined',
    actors: {"Developer":"uses"},
    extends: [],
    includes: ["CICD Pipeline","Security Profiles"]
};
