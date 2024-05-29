
    module.exports = {
    friendlyName: 'removeAdevices',
    description: 'Remove Aggregated Devices from the data center',
    static: false,
    inputs: {dataCenterName: {
    "type": "string",
    "description": "Name of the Data Center"
},
adevices: {
    "type": "array",
    "description": "List of aggregated device names to be removed"
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
