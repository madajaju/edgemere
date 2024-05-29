
    module.exports = {
    friendlyName: 'stop',
    description: 'Method to stop the application instance from the Stopping state to the Stopped state as per the state net',
    static: false,
    inputs: {appInstanceName: {
    "type": "string",
    "description": "Name of the application instance to be stopped"
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
