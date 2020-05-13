const path = require('path');

module.exports = {
    friendlyName: 'plus',
    description: 'Add value to a metric',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to add to the metric',
            type: 'number', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let value = inputs.value;
        if(typeof inputs.value === 'object') {
            value = inputs.value.value;
        }
        obj.value = obj.value + value;
        return obj;
    }
};
