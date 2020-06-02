module.exports = {
    name: 'Release Resources',
    description: 'Release Resources based on the name given when the Resources are requested',
    method: "resource/release",
    actors: {
        'IT Operations': 'uses',
    },
};

