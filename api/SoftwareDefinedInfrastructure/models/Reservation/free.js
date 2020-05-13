const path = require('path');

module.exports = {
    friendlyName: 'confirm',
    description: 'Confirm the Reservation',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        // inputs contains the obj for the this method.
        // obj has the obj for the method.
        obj.device.profile.available.minus({value: obj.request.requirements});
        obj.device.profile.propagate({assoc: 'available', operation:'minus', value: obj.request.requirements});
    }
};
