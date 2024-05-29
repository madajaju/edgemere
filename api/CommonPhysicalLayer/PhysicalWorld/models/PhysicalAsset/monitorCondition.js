
    module.exports = {
    friendlyName: 'monitorCondition',
    description: 'Monitors the condition of physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset whose condition is to be monitored"
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
