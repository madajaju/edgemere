
    module.exports = {
    friendlyName: 'updateApplication',
    description: 'This method could be used to update a specific application created from the template.',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application."
},
args: {
    "type": "json",
    "description": "The JSON object containing updated name value pairs."
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
