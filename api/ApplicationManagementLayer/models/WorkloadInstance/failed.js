
    module.exports = {
    friendlyName: 'failed',
    description: 'Method to indicate that the workload instance has failed',
    static: false,
    inputs: {errorMessage: {
    "type": "string",
    "description": "Error message indicating the reason for the failure"
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
