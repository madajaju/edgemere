module.exports = {
    friendlyName: 'initiateDevice',
    description: 'Initiate the device after creation',
    static: false,
    inputs: {
        deviceName: {
            "type": "string",
            "description": "Name of the device"
        },
    },


    exits: {
        json: (obj) => {
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


    fn: function (obj, inputs, env) {
        return;
    }
};
