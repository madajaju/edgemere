
    module.exports = {
    friendlyName: 'getAdevices',
    description: 'Get all Aggregated Devices associated with the Data Center',
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
