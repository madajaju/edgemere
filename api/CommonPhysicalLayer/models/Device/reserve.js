const path = require('path');

module.exports = {
    friendlyName: 'reserve',
    description: 'Reserve a resource',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        request: {
            description: 'Request for the reservation',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        if(obj.profile.satisfies({request:inputs.request})) {
            let reservation = new Reservation({request:inputs.request, device:obj});
            return [reservation];
        } else {
            return [];
        }
    }
};
