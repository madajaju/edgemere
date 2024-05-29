
    module.exports = {
    friendlyName: 'attachPathway',
    description: 'Attaches a communication pathway to the physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset to which the communication pathway is to be attached"
},
pathwayID: {
    "type": "string",
    "description": "The unique identifier of the communication pathway to be attached"
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
