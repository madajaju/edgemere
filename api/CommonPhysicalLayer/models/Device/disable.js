const path = require('path');

module.exports = {
    friendlyName: 'disable',
    description: 'Disable Device and its hardware',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        info: {
            description: 'Print Information',
            required: false,
            type: "boolean",
        }
    },

    exits: {},

    fn: function (obj, inputs, env) {
        for (let i in obj.hardware) {
            obj.hardware.disable();
        }
        obj.state = "Disable";
        return obj;
    }
};
