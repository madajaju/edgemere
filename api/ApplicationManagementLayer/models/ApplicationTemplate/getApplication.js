
    module.exports = {
    friendlyName: 'getApplication',
    description: 'This method could be used to get details of all applications created from the template.',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application."
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
