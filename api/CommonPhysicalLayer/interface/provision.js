const path = require('path');

module.exports = {
    friendlyName: 'provision',
    description: 'Provision the resources on the devices',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        obj: {
            description: 'Resource to provision',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (inputs, env) {
        let resource = inputs.obj;
        //
        // let hardware = device.provision({requirements: inputs.requirements});

        resource.finishedProvision();
        return hardware;
    }
};
