const path = require('path');

module.exports = {
    friendlyName: 'provision',
    description: 'Provision the Resource',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        return obj;
    }
};
