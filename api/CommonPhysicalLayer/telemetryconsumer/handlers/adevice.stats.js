module.exports = {
    name: 'adevice.stats',
    handlers: [
        {
            description: 'Handle the Stats from a device, or aggregated device',
            action: '/tc/report',
            fn: (data) => {
                return {name: data.name, stats: data.stats};
            }
        },
    ]
};
