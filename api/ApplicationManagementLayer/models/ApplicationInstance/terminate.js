
    module.exports = {
    friendlyName: 'terminate',
    description: 'Method to terminate the application instance from Stopped state to Exit as per state net',
    static: false,
    inputs: {appInstanceName: {
    "type": "string",
    "description": "Name of the application instance to be terminated"
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
