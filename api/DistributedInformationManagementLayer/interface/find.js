const path = require('path');

module.exports = {
    friendlyName: 'find',
    description: 'Find the data and start up an instance',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        query: {
            description: 'Query of the data to find',
            type: 'json', // string|boolean|number|json
            required: false
        },
        file: {
            description: 'YAML file with complex query',
            type: 'YAML', // string|boolean|number|json
            required: false
        }
    },

    exits: {
        success: {},
        json: (obj) => {
            let jdr = datareq.toJSON;
            return {resultes: jdr};
        },
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        // inputs contains the obj for the this method.
        for(let i in env.req.body) {
            inputs[i] = env.req.body[i];
        }
        if(inputs.query) {
            // Create a Data Request
            let datareq = new DataRequest({name:"external",query:inputs.query});
            datareq.fulfill();
            return datareq;
        } else if (inputs.file) {

        }
        env.res.end("Done");
    }
};
