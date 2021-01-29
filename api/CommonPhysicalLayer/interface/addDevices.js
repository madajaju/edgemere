const path = require('path');

module.exports = {
    friendlyname: 'adddevices',
    description: 'add devices to the data center',
    static: false, // true is for class methods. false is for object based.
    inputs: {
        item: {
            description: 'devices to add to the data center',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        if(!obj.profile) {
            obj.profile = new physicalprofile();
        }
        obj.profile.combine(inputs.item);
        return obj;
    }
};
