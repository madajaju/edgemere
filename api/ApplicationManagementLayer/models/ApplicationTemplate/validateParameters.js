
    module.exports = {
    friendlyName: 'validateParameters',
    description: 'This method could be used to validate the parameters passed for the creation of application.',
    static: false,
    inputs: {args: {
    "type": "json",
    "description": "The JSON object containing name value pairs used for creation of applications from the template."
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
