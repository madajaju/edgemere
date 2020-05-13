const path = require('path');

module.exports = {
    friendlyName: 'addDevices',
    description: 'Add Devices to the Data Center',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        item: {
            description: 'Devices to add to the Data Center',
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
