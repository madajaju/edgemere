const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        // obj.profile = obj.profile.combine({profile: inputs.profile});
        return obj;
    }
};
