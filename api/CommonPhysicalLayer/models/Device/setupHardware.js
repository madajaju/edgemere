module.exports = {
    friendlyName: 'setupHardware',
    description: 'Setup the hardware according to the provision',
    static: false,
    inputs: {
        deviceName: {
            "type": "string",
            "description": "Name of the device"
        },
        hardwareConfig: {
            "type": "json",
            "description": "Hardware configuration"
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
