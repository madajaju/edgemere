module.exports = {
    name: 'reservation.confirmed',
    handlers: [
        {
            fn: function (data) {
                console.log("Made it here Reservation Confirmed");
            },
        },
        {
            action: '/cpl/io/provision'
        },
    ]
};
