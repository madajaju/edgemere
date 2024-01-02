module.exports = {
    name: 'Build Service',
    description: 'Build Service is the description',
    method: "data/create",
    actors: {
        'StackDeveloper': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

