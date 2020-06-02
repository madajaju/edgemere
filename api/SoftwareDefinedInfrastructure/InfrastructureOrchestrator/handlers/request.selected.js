module.exports = {
    name: 'request.selected',
    handlers: [
        {
            action: '/sdi/io/evaluateRequest',
            fn: (data) => {
                return {request: data.obj};
            }
        },
    ]
};
