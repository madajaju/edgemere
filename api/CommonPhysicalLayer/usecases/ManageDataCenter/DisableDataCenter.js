module.exports = {
    name: 'Disable Data Center',
    description: 'IT Operations can disable a data center that will disable all of the devices in the data center. This can be used to test business continuity, move data center devices or decomission a data center.',
    method: "datacenter/disable",
    actors: {
        'IT Operations': 'uses',
    },
};

