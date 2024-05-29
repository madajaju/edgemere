
    module.exports = {
    friendlyName: 'deactivate',
    description: 'Deactivates the physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset to be deactivated"
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
