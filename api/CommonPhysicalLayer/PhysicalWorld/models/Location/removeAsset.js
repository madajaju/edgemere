
    module.exports = {
    friendlyName: 'removeAsset',
    description: 'To remove an asset from the location',
    static: false,
    inputs: {locationName: {
    "type": "string",
    "description": "Name of the location"
},
asset: {
    "type": "Asset object",
    "description": "The asset to be removed from the location"
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
