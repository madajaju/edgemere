module.exports = {
    name: 'Build Stack',
    description: 'Build Stack is the description',
    method: "data/create",
    actors: {
        'DevOpsEngineer': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

