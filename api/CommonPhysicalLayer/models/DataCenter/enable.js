const path = require('path');

module.exports = {
    friendlyName: 'enable',
    description: 'Enable Device to be used.',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs, env) {
        for (let i in obj.devices) {
            obj.devices[i].enable();
        }
        for(let i in obj.adevices) {
            obj.adevices[i].enable();
        }
        obj.state = "Enable";
        return obj;
    }
};
