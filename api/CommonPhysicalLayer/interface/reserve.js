module.exports = {
    friendlyName: 'reserve',
    description: 'Get Reservations from Devices, Aggregate Deivces, and DataCenters',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
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
        if(inputs.request.datacenters) {
            for (let i in inputs.request.datacenters) {
                let dc = inputs.request.datacenters[i];
                dc.reserve({request: inputs.request});
            }
        }
        if(inputs.request.aggregates) {
            // Iterate through the adevices
            for (let i in inputs.request.aggregates) {
                let ad = inputs.request.aggregates[i];
                ad.reserve({request: inputs.request});
            }
        }
        // Iterate through the devices
        if(inputs.request.devices) {
            for (let i in inputs.request.devices) {
                let device = inputs.request.devices[i];
                device.reserve({request: inputs.request});
            }
        }
        // Add all of the reservations to the request and say it has been evaluated.
        inputs.request.selected();
    }
};
