module.exports = {
    name: 'Deploy Workload',
    description: 'Deploy Workload is the description',
    method: "workload/deploy",
    actors: {
        'Application Developer': 'uses',
        'DevOps Engineer': 'uses',
    },
};

