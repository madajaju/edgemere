
    module.exports = {
    friendlyName: 'setCoordinates',
    description: 'To set the latitude and longitude of the location',
    static: false,
    inputs: {name: {
    "type": "string",
    "description": "Name of the location"
},
lat: {
    "type": "number",
    "description": "New latitude of the location"
},
long: {
    "type": "number",
    "description": "New longitude of the location"
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
