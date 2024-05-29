
    module.exports = {
    friendlyName: 'getReservedResources',
    description: 'Get List of all reserved resources in the Data Center',
    static: false,
    inputs: {dataCenterName: {
    "type": "string",
    "description": "Name of the Data Center"
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
