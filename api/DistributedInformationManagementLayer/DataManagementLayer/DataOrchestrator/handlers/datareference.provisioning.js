module.exports = {
    name: 'datareference.provisioning',
    handlers: [
        {
            action: '/diml/dml/do/datainstance/create',
            fn: function (data) {
                return {dataref: data.obj};
            },
        },
    ]
};
