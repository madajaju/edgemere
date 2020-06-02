module.exports = {
    name: 'Deploy AI Model',
    description: 'Deploy AI Model is the description',
    method: "aimodel/deploy",
    actors: {
        'DevOpsEngineer': 'uses',
        'ApplicationDeveloper': 'uses',
        'DataEngineer': 'uses',
    },
};

