const path = require('path');

module.exports = {
    friendlyName: 'deploy',
    description: 'Description of the action',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the stack to deploy',
            type: 'string', // string|boolean|number|json
            required: false
        },
        tag: {
            description: 'Tag of the deployment of the stack. This is used to reference the deployed stack.',
            type: 'string', // string|boolean|number|json
            required: false
        },
        env: {
            description: 'Name of the deployment environment',
            type: 'string', // string|boolean|number|json
            required: false
        },
        args: {
            description: 'Arguments passed into the stack deployment',
            type: 'json', // string|boolean|number|json
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
        let stack = Stack.find(inputs.name);
        if(stack) {
            if(!inputs.env) {
                inputs.env = "local"; //default
            }
            stack.deploy({tag: inputs.tag, env: inputs.env, args: inputs.args});
            env.res.end("Done");
        }
        else {
            env.res.end("Error: Could not find the stack:" +  inputs.name);
        }
    }
};
