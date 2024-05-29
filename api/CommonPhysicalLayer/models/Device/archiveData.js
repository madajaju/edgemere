module.exports = {
    friendlyName: 'archiveData',
    description: 'Archive all data related to this device',
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
