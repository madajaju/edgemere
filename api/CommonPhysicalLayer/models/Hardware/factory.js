const path = require('path');

module.exports = {
    friendlyName: 'factory',
    description: 'Create Hardware based on properties',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the hardware',
            type: 'string', // string|boolean|number|json
            required: true
        },
        type: {
            description: 'type of the hardware',
            type: 'string', // string|boolean|number|json
            required: true
        },
        capabilities: {
            description: 'definition of the hardware',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let type = inputs.type.toLowerCase();
        let retval = null;
        if(type === 'compute') {
            retval = new ComputeHardware({name: inputs.name, capabilities: inputs.capabilities});
        } else if(type === 'network') {
            retval = new NetworkHardware({name: inputs.name, capabilities: inputs.capabilities});
        } else if(type === 'storage') {
            retval = new StorageHardware({name: inputs.name, capabilities: inputs.capabilities});
        } else if(type === 'accelerator') {
            retval = new AcceleratorHardware({name: inputs.name, capabilities: inputs.capabilities});
        }
        return retval;
    }
};
