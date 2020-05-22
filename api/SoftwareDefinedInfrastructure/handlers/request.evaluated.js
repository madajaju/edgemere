module.exports = {
    name: 'request.evaluated',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here Request Evaluated");
            },
        },
        {
            action: 'provision'
        },
    ]
};
