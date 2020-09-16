const path = require('path');

module.exports = {
    friendlyName: 'copy',
    description: 'Copy Metric',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let retval = new MetricAttribute({name:obj.name, value:obj.value});
        return retval;
    }
};
