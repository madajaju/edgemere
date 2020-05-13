const path = require('path');

module.exports = {
    friendlyName: 'plus',
    description: 'Add attribute metric to the current value',
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
        let value = inputs.value;
        if (typeof inputs.value === 'object') {
            value = inputs.value.value;
        }
        if (typeof obj.value !== 'object') {
            obj.value = {};
        }
        // Flatten out an array if it is passed in
        if (typeof value === 'object') {
            for (let i in value) {
                if (!obj.value.hasOwnProperty(value[i])) {
                    obj.value[value[i]] = 0;
                }
                obj.value[value[i]]++;
            }
        } else {
            if (!obj.value.hasOwnProperty(value)) {
                obj.value[value] = 0;
            }
            obj.value[value]++;
        }
        return obj;
    }
};
