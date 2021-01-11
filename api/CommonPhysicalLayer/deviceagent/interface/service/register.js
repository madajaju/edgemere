const path = require('path');

module.exports = {
    friendlyName: 'register',
    description: 'Register Service with the Agent',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the service',
            type: 'string', // string|boolean|number|json
            required: true
        },
        instanceName: {
            description: 'Name of the service instance',
            type: 'string', // string|boolean|number|json
            required: true
        },
        externalURL: {
            description: 'URL of the external to the stack interface to the service',
            type: 'string', // string|boolean|number|json
            required: false
        },
        internalURL: {
            description: 'URL of the internal to the stack interface to the service',
            type: 'string', // string|boolean|number|json
            required: false
        }
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        // inputs contains the obj for the this method.
        console.log("Service registered:", inputs.name);

    }
};
