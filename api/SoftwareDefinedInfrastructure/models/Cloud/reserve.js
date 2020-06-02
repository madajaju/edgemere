const path = require('path');
const Service = require('ailtire/src/Server/Service');
const AEvent = require('ailtire/src/Server/AEvent');

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

    exits: {},

    fn: (obj, inputs, env) => {
        let reservations = [];
        inputs.request.fulfill({
            cloud: obj,
            datacenters: obj.datacenters,
            devices: obj.devices,
            aggregates: obj.adevices
        });
    }
};
