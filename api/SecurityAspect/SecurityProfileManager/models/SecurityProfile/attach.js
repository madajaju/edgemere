const path = require('path');

module.exports = {
    friendlyName: 'attach',
    description: 'Attach a security profile to a identity in the system.',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        profile: {
            description: 'Name of the security profile.',
            type: 'string', // string|boolean|number|json
            required: true
        },
        identity: {
            description: 'Name of the identity element in the system.',
            type: 'string', // string|boolean|number|json
            required: true
        }
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        return obj;
    }
};
