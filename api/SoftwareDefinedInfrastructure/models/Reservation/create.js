const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create the Reservation',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        obj.device = inputs.device;
        obj.request = inputs.request;
        // Add the reservation to the cloud.
        obj.request.cloud.addToReservations(obj);
        obj.device.profile.reserved.plus({value: obj.request.requirements});
        obj.device.profile.propagate({assoc: 'reserved', operation:'plus', value: obj.request.requirements});
        return obj;
    }
};
