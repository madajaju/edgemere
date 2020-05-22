module.exports = {
    name: 'reservation.rejected',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here Reservation Confirmed");
                data.obj.device.profile.available.minus({value: data.obj.request.requirements});
                data.obj.device.profile.propagate({assoc: 'available', operation:'minus', value: data.obj.request.requirements});
            },
        },
    ]
};
