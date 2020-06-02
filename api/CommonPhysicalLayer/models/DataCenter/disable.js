const path = require('path');

module.exports = {
    friendlyName: 'disable',
    description: 'Disable Device and its hardware',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs, env) {
        for (let i in obj.devices) {
            obj.devices[i].disable();
        }
        for(let i in obj.adevices) {
            obj.adevices[i].disable();
        }
        obj.state = "Disable";
        return obj;
    }
};
