
    module.exports = {
    friendlyName: 'detachPathway',
    description: 'Detaches a communication pathway from the physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset from which the communication pathway is to be detached"
},
pathwayID: {
    "type": "string",
    "description": "The unique identifier of the communication pathway to be detached"
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
