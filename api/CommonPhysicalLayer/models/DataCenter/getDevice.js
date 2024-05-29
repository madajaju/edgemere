
    module.exports = {
    friendlyName: 'getDevice',
    description: 'Get specific device details in the Data Center',
    static: false,
    inputs: {dataCenterName: {
    "type": "string",
    "description": "Name of the Data Center"
},
deviceName: {
    "type": "string",
    "description": "Name of the Device"
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
