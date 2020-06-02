const path = require('path');

const resourceTypes = {
    'NetworkHardware': 'NetworkResource',
    'StorageHardware': 'StorageResource',
    'ComputeHardware': 'ComputeResource',
    'AcceleratorHardware': 'AcceleratorResource',
};

module.exports = {
    friendlyName: 'factory',
    description: 'Create a Resource based on the hardware to resource table',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the Resource',
            type: 'string', // string|boolean|number|json
            required: true
        },
        value: {
            description: 'value of the hardware',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let retval = null;
        let hwType = inputs.value.className;
        if (!resourceTypes.hasOwnProperty(hwType)) {
            // inputs.id = inputs.name;
            retval = new Resource(inputs);
        } else {
            // inputs.id = inputs.name;
            retval = new global.classes[resourceTypes[hwType]](inputs);
        }
        return retval;
    }
};
