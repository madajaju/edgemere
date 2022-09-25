module.exports = {
    name: 'Version Application Stack',
    description: 'Version Application Stack is the description',
    method: "data/create",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

