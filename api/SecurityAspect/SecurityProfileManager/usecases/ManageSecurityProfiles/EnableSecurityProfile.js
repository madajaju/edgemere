module.exports = {
    name: 'Enable Security Profile',
    description: 'Enable Security Profile is the description',
    method: "data/create",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

