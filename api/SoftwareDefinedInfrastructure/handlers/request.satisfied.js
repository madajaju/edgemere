module.exports = {
    name: 'request.satisfied',
    handlers: [
        {
            fn: function (data) {
                return {request: data.obj.request};
            },
        },
    ]
};
