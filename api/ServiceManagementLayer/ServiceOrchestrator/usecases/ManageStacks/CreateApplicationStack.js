module.exports = {
    name: 'Create Application Stack',
    description: 'Create Application Stack is the description',
    method: "data/create",
    actors: {
        'ApplicationDeveloper': 'uses',
        'StackDeveloper': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

