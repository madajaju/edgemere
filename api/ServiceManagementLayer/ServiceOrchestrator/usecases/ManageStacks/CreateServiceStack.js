module.exports = {
    name: 'Create Service Stack',
    description: 'Create Service Stack is the description',
    method: "data/create",
    actors: {
        'StackDeveloper': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

