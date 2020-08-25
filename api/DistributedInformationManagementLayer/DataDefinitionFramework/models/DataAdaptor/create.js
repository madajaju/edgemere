const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data Adaptor',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the data adaptor',
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
        if(inputs.hasOwnProperty('file')) {
            obj.version = inputs.file.version;
            obj.parameters = inputs.file.parameters;
            obj.identity = new Identity(inputs.file.identity);
        }
        return obj;
    }
};
