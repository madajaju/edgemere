const path = require('path');
const Service = require('ailtire/src/Server/Service');

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

    fn: async (obj, inputs, env) => {
        let reservations = [];
        // Iterate through the datacenters
        reservations = await Service.call('cpl.reserve', {
            request: inputs.request,
            datacenters: obj.datacenters,
            devices: obj.devices,
            aggregates: obj.adevices
        });
        for (let i in reservations) {
            obj.addToReservations(reservations[i]);
        }
        return reservations;
    }
};
