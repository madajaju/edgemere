
    module.exports = {
    friendlyName: 'setTemplate',
    description: 'Method to set a new application template',
    static: false,
    inputs: {template: {
    "type": "json",
    "description": "The new application template in JSON format"
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
