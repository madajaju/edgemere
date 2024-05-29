
    module.exports = {
    friendlyName: 'allocateResources',
    description: 'Method to allocate resources for a specific application',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application"
},
resources: {
    "type": "json",
    "description": "The JSON object containing name-value pairs for resources"
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
