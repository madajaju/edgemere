const path = require('path');

module.exports = {
    friendlyName: 'fulfill',
    description: 'Fulfill the request, the state of the request is moved to needed',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        datacenters: {
            description: 'Datacenters to be used for the fulfillment',
            type: 'object', // string|boolean|number|json
            required: true
        },
        devices: {
            description: 'Devices to be used for the fulfillment',
            type: 'object', // string|boolean|number|json
            required: true
        },
        aggregates: {
            description: 'Aggregates to be used for the fulfillment',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (obj, inputs, env) {
        // Add the fulfill common physical layer to the request.
        obj.addToDatacenters(inputs.datacenters);
        obj.addToDevices(inputs.devices);
        obj.addToAggregates(inputs.aggregates);
        // The state should automatically change to Needed.
    }
};
