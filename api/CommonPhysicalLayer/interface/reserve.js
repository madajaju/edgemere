module.exports = {
    friendlyName: 'reserve',
    description: 'Get Reservations from Devices, Aggregate Deivces, and DataCenters',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        obj: {
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
        if(inputs.obj.datacenters) {
            for (let i in inputs.obj.datacenters) {
                let dc = inputs.obj.datacenters[i];
                dc.reserve({request: inputs.obj});
            }
        }
        if(inputs.obj.aggregates) {
            // Iterate through the adevices
            for (let i in inputs.obj.aggregates) {
                let ad = inputs.obj.aggregates[i];
                ad.reserve({request: inputs.obj});
            }
        }
        // Iterate through the devices
        if(inputs.obj.devices) {
            for (let i in inputs.obj.devices) {
                let device = inputs.obj.devices[i];
                device.reserve({request: inputs.obj});
            }
        }
        // Add all of the reservations to the request and say it has been evaluated.
        inputs.obj.selected();
    }
};
