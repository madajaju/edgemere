module.exports = {
    name: 'reservation.rejected',
    handlers: [
        {
            fn: function (data) {
                data.obj.device.profile.available.minus({value: data.obj.request.requirements});
                data.obj.device.profile.propagate({assoc: 'available', operation:'minus', value: data.obj.request.requirements});
            },
        },
    ]
};
