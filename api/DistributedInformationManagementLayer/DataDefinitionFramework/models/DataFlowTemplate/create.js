const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data AWorkFlow Template',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the data flow template',
            type: 'string', // string|boolean|number|json
            required: true
        },
        sinks: {
            description: 'Names of the sinks',
            type: 'json', // string|boolean|number|json
            required: false
        },
        sources: {
            description: 'Names of the sources',
            type: 'json', // string|boolean|number|json
            required: false
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        let sinks = inputs.sinks;
        let sources = inputs.sources;
        for (let i in sinks) {
            let sink = sinks[i];
            let sinkObj = DataAdaptorTemplate.find(sink);
            if (sinkObj) {
                obj.addToSinks(sinkObj);
            } else {
                console.error("Could not find the sink:", sink, " Not defined!");
            }
        }
        for (let i in sources) {
            let source = sources[i];
            let sourceObj = DataAdaptorTemplate.find(source);
            if (sourceObj) {
                obj.addToSources(sourceObj);
            } else {
                console.error("Could not find the source:", source, " Not defined!");
            }
        }
        return obj;
    }
};
