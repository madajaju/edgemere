const path = require('path');

module.exports = {
    friendlyName: 'reserve',
    description: 'Reserve a Data Instances from a Data Request',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        dataref: {
            description: 'This is the data reference to create a data request',
            type: 'json', // string|boolean|number|json
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

    fn: function (inputs, env) {
        // Create a Data Request from the Data Reference
        let dref = inputs.dataref;

    }
};
