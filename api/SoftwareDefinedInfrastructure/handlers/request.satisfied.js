module.exports = {
    name: 'request.satisfied',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here");
                return {request: data.obj.request};
            },
        },
    ]
};
