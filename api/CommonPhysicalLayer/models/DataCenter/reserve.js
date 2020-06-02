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
        let reservations = [];
        if(obj.profile.satisfies({request:inputs.request})) {
            for(let name in obj.devices) {
                let device = obj.devices[name];
                device.reserve({request: inputs.request});
            }
            for(let name in obj.adevices) {
                let adevice = obj.adevices[name];
                adevice.reserve({request:inputs.requirements});
            }
        }
    }
};
