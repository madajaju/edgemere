const path = require('path');

module.exports = {
    friendlyName: 'reserve',
    description: 'Reserve a Data Instances from a Data Request',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        datarequest: {
            description: 'This is the data request to get the data reservations',
            type: 'json', // string|boolean|number|json
            required: false
        },
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        let dreq = inputs.datarequest;
    }
};
