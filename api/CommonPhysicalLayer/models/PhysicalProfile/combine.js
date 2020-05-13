const path = require('path');

module.exports = {
    friendlyName: 'combine',
    description: 'Combine Physical Profile',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        profile: {
            description: 'Profile to add to the current profile',
            type: 'object',
            required: true
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        inputs.profile.parent = obj;
        for (let m in inputs.profile.definition.associations) {
            if (obj[m]) {
                obj[m].plus({value: inputs.profile[m]});
            }
        }
        return obj;
    }
};



