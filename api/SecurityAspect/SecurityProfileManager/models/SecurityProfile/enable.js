const path = require('path');

module.exports = {
    friendlyName: 'enable',
    description: 'Enable a security profile.',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the security profile.',
            type: 'string', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        return obj;
    }
};
