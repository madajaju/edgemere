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
        obj.device = inputs.device;
        obj.request = inputs.request;

        obj.device.profile.reserved.plus({value: obj.request.requirements});
        obj.device.profile.propagate({assoc: 'reserved', operation:'plus', value: obj.request.requirements});
        return obj;
    }
};
