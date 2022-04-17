module.exports = {
    name: 'Deploy Security Profile',
    description: 'Deploy Security Profile is the description',
    method: "data/create",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

