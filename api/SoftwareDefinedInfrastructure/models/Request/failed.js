const path = require('path');

module.exports = {
    friendlyName: 'failed',
    description: 'Request Failed',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        message: {
            description: 'Reason why this failed',
            type: 'string', // string|boolean|number|json
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

    fn: function (obj, inputs, env) {
        // inputs contains the obj for the this method.
        // obj has the obj for the method.
        obj.message = inputs.message;
    }
};
