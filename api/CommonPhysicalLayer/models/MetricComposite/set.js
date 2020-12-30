const path = require('path');

module.exports = {
    friendlyName: 'set',
    description: 'Set metric to the current value',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        value: {
            description: 'Value to set to the metric',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        console.log("Composite Set:", inputs.value.name);
        let value = inputs.value;
        // Check if the input  is a MetricComposite. If so then iterate over the values and call plus.
        // This is a class being added.
        if (typeof inputs.value === 'object') {
            let syncedObj = obj.findMatchDeep(inputs);
            if (inputs.value.className) {
                let vclsname = inputs.value.className;
                if (vclsname === 'MetricComposite') {
                    for (let i in inputs.value.values) {
                        let val = inputs.value.values[i];
                        syncedObj.set({value: val});
                    }
                } else if (vclsname === 'MetricConsumeable') {
                    if (!syncedObj.hasInValues(inputs.value.name)) {
                        syncedObj.addToValues(inputs.value.copy());
                    } else {
                        syncedObj.values[inputs.value.name].set({value: inputs.value});
                    }
                } else if (vclsname === 'MetricAttribute') {
                    if (!syncedObj.hasInValues(inputs.value.name)) {
                        syncedObj.addToValues(inputs.value.copy());
                    } else {
                        syncedObj.values[inputs.value.name].set({value: inputs.value});
                    }
                } else {
                    console.error("Could not add the attribute:", inputs.value)
                }
            } else {
                syncedObj.set({value: inputs.value.value});
            }
        } else {
            console.error("Do not know the name of the metric:", inputs.value);
        }
        return obj;
    }
};
