module.exports = {
    name: 'Request.Needed',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here: Request Needed!");
            },
        },
        {
            action: '/cpl/reserve'
        },

    ]
};
