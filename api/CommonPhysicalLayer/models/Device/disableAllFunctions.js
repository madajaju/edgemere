module.exports = {
    friendlyName: 'disableAllFunctions',
    description: 'Disable all functions of this device',
    static: false,
    inputs: {},


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
