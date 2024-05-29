
    module.exports = {
    friendlyName: 'detachSensor',
    description: 'Detaches a sensor from the physical asset',
    static: false,
    inputs: {assetID: {
    "type": "string",
    "description": "The unique identifier of the asset from which the sensor is to be detached"
},
sensorID: {
    "type": "string",
    "description": "The unique identifier of the sensor to be detached"
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
