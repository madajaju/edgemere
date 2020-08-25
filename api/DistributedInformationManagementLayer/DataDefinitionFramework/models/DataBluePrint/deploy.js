const path = require('path');

module.exports = {
    friendlyName: 'deploy',
    description: 'Deploy a Data Blue Print with sources',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the data blue print',
            type: 'string', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'file with the definition',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
        sources: {
            description: 'sources for the blueprint',
            type: 'string', // string|boolean|number|json
            required: false
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        if(inputs.hasOwnProperty('file')) {
            obj.version = inputs.file.version;
            obj.parameters = inputs.file.parameters;
            obj.identity = new Identity(inputs.file.identity);
            for(let i in inputs.file.sources) {
                let sourceName = i;

            }
        }
        // comma Separated name=value pairs
        if(inputs.hasOwnProperty('sources')) {
            let pairs = inputs.sources.split(',');
            let [name,value] = pairs.split('=');

        }
        return obj;
    }
};
