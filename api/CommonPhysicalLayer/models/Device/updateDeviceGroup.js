module.exports = {
    friendlyName: 'updateDeviceGroup',
    description: 'Update the device group after a new device is added or removed',
    static: false,
    inputs: {
        deviceName: {
            "type": "string",
            "description": "Name of the device"
        },
        groupName: {
            "type": "string",
            "description": "Name of the device group"
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
