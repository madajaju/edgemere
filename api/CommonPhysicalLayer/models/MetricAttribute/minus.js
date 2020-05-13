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
        return obj;
        let value = inputs.value;
        if(typeof inputs.value === 'object') {
           value = inputs.value.value;
        }
        if(typeof obj.value === 'object') {
            // Flatten out an array if it is passed in
            if(typeof value === 'object') {
                for(let i in value) {
                    obj.value.push(value[i])
                }
            }
            else {
                obj.value.push(value);
            }
        }
        else {
            if(typeof value === 'object') {
                value.push(obj.value);
                obj.value = value;
            }
            else {
                obj.value = [obj.value, value];
            }
        }
        return obj;
    }
};
