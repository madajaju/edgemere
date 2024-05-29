
    module.exports = {
    friendlyName: 'location/setCoordinates',
    description: 'Set the coordinates of a location',
    static: true,
    inputs: {},


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
 

    fn: function (obj, inputs, env) {
                    return;
                }
};
