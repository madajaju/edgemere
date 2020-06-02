const path = require('path');

module.exports = {
    friendlyName: 'consume',
    description: 'Consume attribute metric to the current value',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to add to the metric',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        // It is not consuming anything.
        return false;
    }
};
