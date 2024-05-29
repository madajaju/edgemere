
    module.exports = {
    friendlyName: 'initialize',
    description: 'Method to initialize the application instance from the Init state as per the state net',
    static: false,
    inputs: {appName: {
    "type": "string",
    "description": "Name of the application to initialize"
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
