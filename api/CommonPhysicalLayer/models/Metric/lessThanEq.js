const path = require('path');

module.exports = {
    friendlyName: 'lessThanEq',
    description: 'Test less than or equal to the value passed in',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to test against the metric',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let value = inputs.value;
        if(typeof value === 'object') {
            if(obj.name === value.name) {
                return obj.value <= value.value;
            }
        }
        else {
            return obj.value <= value.value;
        }
    }
};
