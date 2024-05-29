module.exports = {
    friendlyName: 'updateStatus',
    description: 'Update the status of device after an update',
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
