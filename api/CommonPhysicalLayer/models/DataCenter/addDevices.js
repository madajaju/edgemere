const path = require('path');

module.exports = {
    friendlyName: 'addDevices',
    description: 'Add Devices to the Data Center',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        datacenter: {
            description: 'Name of the Data Center',
            type: 'string',
            required: false,
        },
        parentDevice: {
            description: 'Name of the Parent Device',
            type: 'string',
            required: false,
        },
        file: {
            description: 'file with the definition',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        if(!obj.profile) {
            obj.profile = new PhysicalProfile();
        }
        obj.profile.combine({profile: inputs.item.profile});
        return obj;
    }
};
