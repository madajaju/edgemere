
    module.exports = {
    friendlyName: 'getLocationDetails',
    description: 'To get all the details of a location',
    static: false,
    inputs: {name: {
    "type": "string",
    "description": "Name of the location"
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
