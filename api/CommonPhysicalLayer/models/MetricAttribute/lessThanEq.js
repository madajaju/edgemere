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
        if (typeof value === 'object') {
            if (obj.name === value.name) {
                if(value.className === 'MetricComposite') {
                    return value.values.hasOwnProperty(obj.value);
                }
                else {
                    let flag = false;
                    if(typeof value.value === 'object') {
                        flag = value.value.hasOwnProperty(obj.value);
                    } else  {
                       flag = value.value.includes(obj.value);
                    }
                    return flag;
                }
            }
        } else {
            return false;
        }
    }
};
