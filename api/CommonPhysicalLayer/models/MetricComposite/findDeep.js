module.exports = {
    friendlyName: 'findDeep',
    description: 'Find Metric with name',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to match with',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        // Check if the input  is a MetricComposite. If so then iterate over the values and call plus.
        if (!inputs.value && inputs.value.length === 0) {
            if (obj.name === inputs.value) {
                return obj;
            }
        }
        let retval = _findDeep(obj, inputs.value);
        return retval;
    }
};

function _findDeep(obj, ovalue) {
    if (obj.name === ovalue) {
        return obj;
    }
    for (let i in obj.values) {
        let value = obj.values[i];
        if (value.className === "MetricComposite") {
            if (value.name === ovalue) {
                return value;
            }
        }
    }
    for (let i in obj.values) {
        let value = obj.values[i];
        if (value.className === "MetricComposite") {
            let retval = _findDeep(value, ovalue);
            if (retval) {
                return retval
            }
        }
    }
    return null;
};
