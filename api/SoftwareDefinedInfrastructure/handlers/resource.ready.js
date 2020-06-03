module.exports = {
    name: 'resource.ready',
    handlers: [
        {
            action: '/sdi/request/reserve',
            fn: function (data) {
                return {request: data.obj.request};
            },
        },
    ]
};
