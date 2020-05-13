const path = require('path');

module.exports = {
    friendlyName: 'valueToString',
    description: 'Change to string Metric Consumeable',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        console.log("OBJ:", obj);
        return bytesToSize(obj.value);
    }
};

function bytesToSize(value) {
    if (value === 0) return '0';
    const k = 1024;
    const dm = 3;
    const sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const i = Math.floor(Math.log(value) / Math.log(k));
    return parseFloat(value / Math.pow(k, i)).toFixed(dm) + ' ' + sizes[i];
}

