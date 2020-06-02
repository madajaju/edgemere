module.exports = {
    name: 'Request.Needed',
    handlers: [
        {
            description: 'Default Handler',
            fn: function (data) {
                console.log("Made it here: Request Needed!");
            },
        },
        {
            description: 'Reserve the Device when a request is needed',
            action: '/cpl/reserve',
            fn: (data) => {
                return {request: data.obj};
            }
        },

    ]
};
