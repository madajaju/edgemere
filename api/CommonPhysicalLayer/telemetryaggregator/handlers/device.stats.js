module.exports = {
    name: 'device.stats',
    handlers: [
        {
            description: 'Handle the Stats from the device',
            action: '/ta/report',
            fn: (data) => {
                return {name: data.name, stats: data.stats};
            }
        },
    ]
};
