
    module.exports = {
    friendlyName: 'deleteApplication',
    description: 'This method could be used to delete a specific application created from the template.',
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
