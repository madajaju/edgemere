const path = require('path');

module.exports = {
    friendlyName: 'minus',
    description: 'Substract metric to the current value',
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
        let value = inputs.value;
        // Check if the input  is a MetricComposite. If so then iterate over the values and call plus.
        // This is a class being added.
        if (typeof inputs.value === 'object') {
            let syncedObj = obj.findMatchDeep(inputs);
            if (inputs.value.definition) {
                if (inputs.value.definition.name === 'MetricComposite') {
                    for (let i in inputs.value.values) {
                        let val = inputs.value.values[i];
                        syncedObj = syncedObj.minus({value: val});
                    }
                } else {
                    if (!syncedObj.hasInValues(inputs.value.name)) {
                        syncedObj.addToValues(inputs.value);
                    } else {
                        syncedObj.values[inputs.value.name].minus({value: inputs.value});
                    }
                }
            } else {
                syncedObj.minus({value: inputs.value.value});
            }
        } else {
            console.error("Do not know the name of the metric:", inputs.value);
        }
        return obj;
    }
};
