module.exports = {
    friendlyName: 'findMatchDeep',
    description: 'Find Metric with name',
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
        // Check if the input  is a MetricComposite. If so then iterate over the values.
        if (inputs.value.className !== 'MetricComposite') {
            // Check if the inputs.value is name value pair
            return obj;
        }
        if (!inputs.value.name && inputs.value.name.length === 0) {
            if (obj.name === inputs.value.name) {
                return obj;
            }
        }
        let retval = _findMatchDeep(obj, inputs.value);
        if (!retval) {
            retval = new MetricComposite({name: inputs.value.name, value: inputs.value.values});
        }
        obj.addToValues(retval);
        return retval;
    }
};

function _findMatchDeep(obj, ovalue) {
    if (obj.name === ovalue.name) {
        return obj;
    }
    for (let i in obj.values) {
        let value = obj.values[i];
        if (value.className === "MetricComposite") {
            if (value.name === ovalue.name) {
                return value;
            }
        }
    }
    for (let i in obj.values) {
        let value = obj.values[i];
        if (value.className === "MetricComposite") {
            let retval = _findMatchDeep(value, ovalue);
            if (retval) {
                return retval
            }
        }
    }
    return null;
};
