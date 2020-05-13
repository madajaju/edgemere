module.exports = {
    name: 'Enable Data Center',
    description: 'IT Operations can enable a data center that has been disabled',
    method: "datacenter/enable",
    actors: {
        'IT Operations': 'uses',
    },
};

