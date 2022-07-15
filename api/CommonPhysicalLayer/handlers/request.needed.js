module.exports = {
    name: 'Request.Needed',
    handlers: [
        {
            description: 'Reserve the Device when a request is needed',
            action: '/cpl/reserve',
            fn: (data) => {
                return {request: data.obj};
            }
        },

    ]
};
