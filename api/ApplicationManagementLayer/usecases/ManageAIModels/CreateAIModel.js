module.exports = {
    name: 'Create AI Model',
    description: 'Create AI Model is the description',
    method: "aimodel/create",
    actors: {
        'Application Developer': 'uses',
        'Data Scientist': 'uses',
    },
    steps: [
        {action:'aimodel/create', parameters: {name: 'name1' } }
    ]
}

