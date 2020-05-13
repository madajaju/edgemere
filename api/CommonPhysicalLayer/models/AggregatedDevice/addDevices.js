const path = require('path');

module.exports = {
    friendlyName: 'addDevices',
    description: 'Add Devices to the Aggregated Device',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        item: {
            description: 'Devices to add to the Aggregated Device',
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
        obj.profile = obj.profile.combine({profile: inputs.item.profile});
        return obj;
    }
};
