const path = require('path');

module.exports = {
    friendlyName: 'addAdevices',
    description: 'Add Adevices to the Data Center',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        item: {
            description: 'Adevices to add to the Data Center',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        if(!obj.profile) {
            obj.profile = new PhysicalProfile();
        }
        obj.profile.combine(inputs.item);
        return obj;
    }
};
