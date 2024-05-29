
    module.exports = {
    friendlyName: 'addAsset',
    description: 'To add an asset to the location',
    static: false,
    inputs: {locationName: {
    "type": "string",
    "description": "Name of the location"
},
asset: {
    "type": "Asset object",
    "description": "The asset to be added to the location"
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
