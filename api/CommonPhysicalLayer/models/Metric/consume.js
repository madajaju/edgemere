const path = require('path');

module.exports = {
    friendlyName: 'consume',
    description: 'Consume value from a metric',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to consume from the metric',
            type: 'number', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let value = inputs;
        if(typeof inputs.value === 'object') {
            value = inputs.value;
        }
        if(value.value === 0) {
            return false;
        }
        if(obj.value === 0) {
            return false;
        }
        if(value.value < obj.value) {
            obj.value = obj.value - value.value;
            value.value = 0;
        } else {
            value.value = value.value - obj.value;
            obj.value = 0;
        }
        return true;
    }
};
