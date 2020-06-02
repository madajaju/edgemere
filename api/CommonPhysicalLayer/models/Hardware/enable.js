const path = require('path');

module.exports = {
    friendlyName: 'enable',
    description: 'Enable Device to be used.',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs, env) {
        console.log("Enable Hardware:");
        return obj;
    }
};
