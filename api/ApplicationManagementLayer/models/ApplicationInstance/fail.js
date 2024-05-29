
    module.exports = {
    friendlyName: 'fail',
    description: 'Method to change the state of the application instance to Failed from Stopped as per state net',
    static: false,
    inputs: {appInstanceName: {
    "type": "string",
    "description": "Name of the application instance to be moved to Failed state"
},
errorMessage: {
    "type": "string",
    "description": "Error message when moving to failed state"
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
