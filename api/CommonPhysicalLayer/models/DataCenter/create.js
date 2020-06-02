const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data Center',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the DataCenter',
            type: 'string', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'file with the definition',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        obj.profile = new PhysicalProfile();
        if(inputs.hasOwnProperty('file')) {
        }
        return obj;
    }
};
