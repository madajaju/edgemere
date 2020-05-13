module.exports = {
    name: 'Release Resources',
    description: 'Release Resources based on the name given when the Resources are requested',
    method: "/sdi/releaseResources",
    actors: {
        'IT Operations': 'uses',
    },
};

