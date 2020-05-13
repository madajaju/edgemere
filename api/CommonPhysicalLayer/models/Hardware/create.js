const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create Hardware',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the hardware',
            type: 'string', // string|boolean|number|json
            required: true
        },
        capabilities: {
            description: 'capabilities of the hardware',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let reserved = {};
        for(let i in inputs.capabilities) {
            reserved[i] = 0;
        }
        // Create a CompositeMetric that has a name of the subclass name as the name of the compositemetric.

        obj.profile = new PhysicalProfile({name: obj.className.replace(/Hardware/,''), capabilities: inputs.capabilities, available: inputs.capabilities, reserved:reserved});
        obj.name = inputs.name;
        return obj;
    }
};
