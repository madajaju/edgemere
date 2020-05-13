const path = require('path');

module.exports = {
    friendlyName: 'reserve',
    description: 'Get Reservations from Devices, Aggregate Deivces, and DataCenters',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        device: {
            description: 'Device to provision',
            type: 'object', // string|boolean|number|json
            required: true
        },
        requirements: {
            description: 'requirements to provision',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (inputs, env) {
        let device = Device.find(inputs.device.id);
        let hardware = device.provision({requirements: inputs.requirements});
        return hardware;
    }
};
