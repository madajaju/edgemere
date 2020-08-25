module.exports = {
    name: 'datareference.provisioned',
    handlers: [
        {
            action: '/sml/so/servicelet/assignData',
            fn: function (data) {
                return {dataReference: data.obj, servicelet: data.obj.parent};
            },
        },
    ]
};
