const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create Composite Metric',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the metric',
            type: 'string', // string|boolean|number|json
            required: true
        },
        value: {
            description: 'Value of the metric',
            type: 'string', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        let value =  sizeToBytes(inputs.value);
        obj.value = value;
        return obj;
    }
};

function sizeToBytes(value) {
    const sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let bytes = parseFloat(value);
    let size = '';
    if (bytes !== value) {
        size = value.replace(bytes, '').toUpperCase();
    }
    const k = 1024;
    for (let mi = 1; mi <= sizes.length; mi++) {
        if (size.includes(sizes[mi])) {
            const mpow = Math.pow(k,mi);
            const retval = Math.floor(bytes * mpow);
            return retval;
        }
    }
    return bytes;
}

