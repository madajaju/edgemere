const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create the Cloud',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the cloud',
            type: 'string', // string|boolean|number|json
            required: true
        },
        type: {
            description: 'Type of cloud',
            type: 'string', // string|boolean|number|json
            required: false
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        obj.name = inputs.name;
        if(inputs.type) {
            let cloudtype = CloudType.find(inputs.type);
            if(cloudtype) {
                obj.type = cloudtype;
            }
            else {
                throw new Error("Could not find the Cloud Type:", inputs.type);
            }
        }
        // Add the reservation to the cloud.
        return obj;
    }
};
