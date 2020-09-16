module.exports = {
    name: 'datarequest.needed',
    handlers: [
        {
            action: '/diml/dml/do/reserve',
            fn: function (data) {
                return {request: data.obj};
            },
        },
    ]
};
