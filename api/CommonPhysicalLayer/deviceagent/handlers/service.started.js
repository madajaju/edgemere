module.exports = {
    name: 'service.started',
    handlers: [
        {
            description: 'Service for the Device Agent has started',
            action: '/da/service/register',
            fn: (data) => {
                return data;
            }
        },

    ]
};
