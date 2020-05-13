module.exports = {
    name: 'Remove Data Center',
    description: 'IT Operations can remove a Data Center and all of its devices and aggregated devices',
    method: "datacenter/remove",
    actors: {
        'IT Operations': 'uses',
    },
};

