const path = require('path');

module.exports = {
    friendlyName: 'copy',
    description: 'Copy Metric',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        retval = new MetricComposite({name:obj.name});
        for(let i in obj.values) {
           let value = obj.values[i]
            retval.addToValues(value.copy());
        }
        return retval;
    }
};
