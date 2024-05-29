
    module.exports = {
    friendlyName: 'kill',
    description: 'Method to initiate a stop action on the running application instance as per the state net',
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
