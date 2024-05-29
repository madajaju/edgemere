
    module.exports = {
    friendlyName: 'provision',
    description: 'Method to provision the application instance from the Initializing state to the Running state as per the state net',
    static: false,
    inputs: {appInstanceName: {
    "type": "string",
    "description": "Name of the application instance for which the provisioning has been done"
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
