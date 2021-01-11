module.exports = {
    name: 'agent.started',
    handlers: [
        {
            description: 'Reserve the Device when a request is needed',
            action: '/dm/agent/register',
            fn: (data) => {
                return {name: data.name, url: data.url};
            }
        },

    ]
};
