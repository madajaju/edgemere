module.exports = {
    name: 'Adjust Temperature',
    description: 'Adjust Temperature is the description',
    given: "Tempature control asset",
    when: "Monitoring system is activated",
    then: "Continuous data stream is received",
    method: "data/create",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

