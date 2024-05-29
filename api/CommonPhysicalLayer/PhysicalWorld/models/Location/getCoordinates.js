
    module.exports = {
    friendlyName: 'getCoordinates',
    description: 'To get the latitude and longitude of the location',
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
