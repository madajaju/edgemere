const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create Physical Profile',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        parent: {
            description: 'Parent to add to the current profile',
            type: 'object',
            required: false
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        // this is where we look up and assign the type of capability
        if(inputs) {
            obj.name = inputs.name;
            obj.capabilities = new MetricComposite({name:inputs.name, value: inputs.capabilities});
            obj.available = new MetricComposite({name:inputs.name, value: inputs.available});
            obj.reserved = new MetricComposite({name:inputs.name, value: inputs.reserved});
        }
        else {
            obj.name = "";
            obj.capabilities = new MetricComposite({name:"", value: {}});
            obj.available = new MetricComposite({name:"", value: {}});
            obj.reserved = new MetricComposite({name:"", value: {}});
        }
        return obj;
    }
};
