const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data Source',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the data source',
            type: 'string', // string|boolean|number|json
            required: true
        },
        adaptor: {
            description: 'Adaptor for the data source',
            type: 'ref', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'file with the definition',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
        parameters: {
            description: 'parameters comma separated name=value,vname2=value2',
            type: 'string', // string|boolean|number|json
            required: false
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        let adaptor = inputs.adaptor;
        if(inputs.adaptor === 'string') {
           adaptor = DataAdaptor.find(adaptor);
           if(!adaptor) {
               console.error("Adaptor is not found:", adaptor);
               return null;
           }
           obj.adaptor = adaptor;
        }
        if(inputs.hasOwnProperty('file')) {
            obj.version = inputs.file.version;
            obj.parameters = inputs.file.parameters;
        }
        if(inputs.hasOwnProperty('parameters')) {
            obj.parameters = inputs.parameters;
        }
        return obj;
    }
};
