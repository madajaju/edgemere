const path = require('path');

module.exports = {
    friendlyName: 'satisfied',
    description: 'The Request is staisfied',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
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
        obj.message = "Ready";
    }
};
