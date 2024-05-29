
    module.exports = {
    friendlyName: 'getApplicationUsage',
    description: 'Method to get the usage of a specific application',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application"
},
},


    exits: {json: (obj) => {
                        return obj;
                    },
success: (obj) => {
                        return obj;
                    },
notFound: (obj) => {
                        console.error("Object not Found:", obj);
                        return null;
                    },
},
 

    fn: function (obj, inputs, env) { return; }
};
