module.exports = {
    name: 'Deploy Stack',
    description: 'Deploy Stack allows a devops engineer to deploy a stack to an environment. Parameters can be' +
        ' passed during the deployment of the stack to the environment. Policies are attached to the stack during' +
        ' deployment and the stack is Service Orchestrator creates a landscape request to match the request of deploying' +
        ' the stack requirements.',
    method: "stack/deploy",
    actors: {
        'DevOps Engineer': 'uses',
    },
};

