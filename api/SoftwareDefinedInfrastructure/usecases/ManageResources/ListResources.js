module.exports = {
    name: 'List Resources',
    description: 'List Resources and their utilization numbers. This is used for capacity planning.',
    method: "/sdi/listResources",
    actors: {
        'IT Operations': 'uses',
    },
};

