module.exports = {
    name: 'request.selected',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here Request selected");
            },
        },
        {
            action: '/sdi/io/evaluateRequest'
        },
    ]
};
