
    module.exports = {
    friendlyName: 'setArgs',
    description: 'Method to set multiple arguments for the workload template at once',
    static: false,
    inputs: {args: {
    "type": "json",
    "description": "Name value pairs used for the setting of arguments to the template."
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
