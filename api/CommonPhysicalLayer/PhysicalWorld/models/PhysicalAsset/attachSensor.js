
    module.exports = {
    friendlyName: 'attachSensor',
    description: 'Attaches a sensor to the physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset to which the sensor is to be attached"
},
sensorID: {
    "type": "string",
    "description": "The unique identifier of the sensor to be attached"
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
