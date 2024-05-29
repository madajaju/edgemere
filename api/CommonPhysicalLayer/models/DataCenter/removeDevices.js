
    module.exports = {
    friendlyName: 'removeDevices',
    description: 'Remove Devices from the data center',
    static: false,
    inputs: {dataCenterName: {
    "type": "string",
    "description": "Name of the Data Center"
},
devices: {
    "type": "array",
    "description": "List of device names to be removed"
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
