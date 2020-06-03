module.exports = {
    name: 'Get Resources',
    description: 'Get Resources based on a set of requirements, this could be one resource or a set of ' +
        'resources. Requires a cloud and requirements to be specified. A name for the resources can be requested.',
    method: "resource/get",
    actors: {
        'IT Operations': 'uses',
    },
};

