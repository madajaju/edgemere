
    module.exports = {
    friendlyName: 'duplicateApplication',
    description: 'Method to duplicate an existing application',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application to duplicate"
},
newAppName: {
    "type": "string",
    "description": "Name for the new application"
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
