module.exports = {
    name: 'resource.ready',
    handlers: [
        {
            action: '/sdi/checkRequest',
            fn: function (data) {
                return {request: data.obj.request};
            },
        },
    ]
};
