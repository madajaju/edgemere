const path = require('path');

module.exports = {
    friendlyName: 'combine',
    description: 'Combine Physical Profile',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        assoc: {
            description: 'Association to propagate',
            type: 'string',
            required: true
        },
        operation: {
            description: 'Operation to propagate',
            type: 'string',
            required: true
        },
        value: {
            description: 'Value to proagate',
            type: 'string',
            required: true
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method
        if(obj.parent) {
            obj.parent[inputs.assoc][inputs.operation]({value: inputs.value});
            obj.parent.propagate(inputs);
        }
        return obj;
    }
};



