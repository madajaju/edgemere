const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create Composite Metric',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the composite metric',
            type: 'string',
            required: false
        },
        value: {
            description: 'Values to add to the metric',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        for (let name in inputs.value) {
            // this is where we look up and assign the type of capability
            let value = Metric.factory({name:name, value:inputs.value[name]});
            obj.addToValues(value);
        }
        return obj;
    }
};
