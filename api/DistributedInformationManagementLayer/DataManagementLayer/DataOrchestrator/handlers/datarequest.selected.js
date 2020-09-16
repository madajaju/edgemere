module.exports = {
    name: 'datarerquest.selected',
    handlers: [
        {
            action: '/diml/dml/do/evaluate',
            fn: function (data) {
                return {request: data.obj};
            },
        },
    ]
};
