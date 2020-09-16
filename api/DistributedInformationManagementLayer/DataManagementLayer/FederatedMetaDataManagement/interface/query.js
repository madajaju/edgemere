const path = require('path');

module.exports = {
    friendlyName: 'query',
    description: 'Query the MetaData for the data in the query',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        expression: {
            description: 'This is the expression used in the query to return data',
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
        let expression = inputs.expression;
        // The expression should be used to find the data and return a data.
        let data = global._instances['Data'];

        if(env && env.res) {
            env.res.end(data.toJSON());
        }
        return data;
    }
};
