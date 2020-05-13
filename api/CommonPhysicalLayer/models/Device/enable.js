const path = require('path');

module.exports = {
    friendlyName: 'enable',
    description: 'Enable Device to be used.',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs, env) {
        for (let i in obj.hardware) {
            obj.hardware.enable();
        }
        obj.state = "Enable";
        return obj;
    }
};
