const path = require('path');
module.exports = {
    friendlyName: 'enable',
    description: 'Enable Device and all of its hardware',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the device',
            type: 'string',
            required: false,
        },
        id: {
            description: 'ID of the device',
            type: 'string',
            required: false,
        }
    },

    exits: {},

    fn: function (inputs, env) {
        let obj = Device.find(inputs.name);
        if(!obj) {
            obj = Device.find(inputs.id);
        }
        obj.enable();
        env.res.send({device:obj.toJSON});
    }
};
