module.exports = {
    name: 'Modify Application Stack',
    description: 'Modify Application Stack is the description',
    method: "data/create",
    actors: {
        'StackDeveloper': 'uses',
        'ApplicationDeveloper': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

