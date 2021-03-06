const path = require('path');

module.exports = {
    friendlyName: 'register',
    description: 'Register Service with the Agent',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        data: {
            description: 'URL of the data manager',
            type: 'string', // string|boolean|number|json
            required: true
        },
        policy: {
            description: 'URL of the policy engine manager',
            type: 'string', // string|boolean|number|json
            required: true
        },
        name: {
            description: 'Name of the agent',
            type: 'string', // string|boolean|number|json
            required: true
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
        env.res.json(global.classes);
        env.res.end("Done");
    }
};
