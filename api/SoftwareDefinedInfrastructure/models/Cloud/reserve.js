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
        // Iterate through the datacenters
        inputs.request.fulfill({
            datacenters: obj.datacenters,
            devices: obj.devices,
            aggregates: obj.adevices
        });
        /* for (let i in reservations) {
            obj.addToReservations(reservations[i]);
        }
        return reservations;
         */
    }
};
