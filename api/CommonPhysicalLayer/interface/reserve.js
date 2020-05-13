const path = require('path');

module.exports = {
    friendlyName: 'reserve',
    description: 'Get Reservations from Devices, Aggregate Deivces, and DataCenters',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        datacenters: {
            description: 'Devices to add to the Data Center',
            type: 'object', // string|boolean|number|json
            required: true
        },
        devices: {
            description: 'Devices to add to the Data Center',
            type: 'object', // string|boolean|number|json
            required: true
        },
        aggregates: {
            description: 'Devices to add to the Data Center',
            type: 'object', // string|boolean|number|json
            required: true
        },
        request: {
            description: 'Request for the reservation',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (inputs, env) {
        let reservations = [];
        // Iterate through the datacenters
        if(inputs.datacenters) {
            for (let i in inputs.datacenters) {
                let dc = inputs.datacenters[i];
                let tres = dc.reserve({request: inputs.request});
                for (let j in tres) {
                    // What should I do here?
                    // obj.addToReservations(tres[j]);
                    reservations.push(tres[j]);
                }
            }
        }
        if(inputs.aggregates) {
            // Iterate through the adevices
            for (let i in inputs.aggregates) {
                let ad = inputs.aggregates[i];
                let tres = ad.reserve({request: inputs.request});
                for (let j in tres) {
                    // TBD
                    // obj.addToReservations(tres[j]);
                    reservations.push(tres[j]);
                }
            }
        }
        // Iterate through the devices
        if(inputs.devices) {
            for (let i in inputs.devices) {
                let device = inputs.devices[i];
                let tres = device.reserve({request: inputs.request});
                for (let j in tres) {
                    // TBD
                    // obj.addToReservations(tres[j]);
                    reservations.push(tres[j]);
                }
            }
        }
        // return all of the reservations.
        return reservations;
    }
};
