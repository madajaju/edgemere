const path = require('path');

const metricTypes = {
    'speed': 'MetricAttribute',
    'cores': 'MetricConsumeable',
    'memory': 'MetricConsumeable',
    'size': 'MetricConsumeable',
};

module.exports = {
    friendlyName: 'factory',
    description: 'Create a metric based on the metrictype table',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the metric',
            type: 'string', // string|boolean|number|json
            required: true
        },
        value: {
            description: 'value of the metric',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let retval = null;
        if (typeof inputs.value === 'object') {
            // inputs.id = inputs.name;
            retval = new MetricComposite(inputs);
        } else if (!metricTypes.hasOwnProperty(inputs.name)) {
            // inputs.id = inputs.name;
            retval = new Metric(inputs);
        } else {
            // inputs.id = inputs.name;
            retval = new global.classes[metricTypes[inputs.name]](inputs);
        }
        return retval;
    }
};
