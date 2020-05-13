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
        let found = false;
        for (let i in obj.values) {
            let tvalue = obj.values[i];
            if(value.values[i]) {
                if (tvalue.lessThanEq({value: value.values[i]})) {
                    found = true;
                } else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return found;
    }
};
