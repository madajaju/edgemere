module.exports = {
    name: 'Toogle Switch',
    description: 'Turn on-off Switch',
    method: "data/create",
    given: "Switch control asset",
    when: "Switch state needs changing",
    then: "Control command is sent",
    actors: {
        'Actor': 'uses',
    },
    steps: [
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
        { action: 'data/list', parameters: {name:'hello', file:'./templates/world.yml'}},
    ]
};

