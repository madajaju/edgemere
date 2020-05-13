const path = require('path');

module.exports = {
    friendlyName: 'confirm',
    description: 'Description of the method',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        attr1: {
            description: 'Description for the parameter',
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
    }
};
