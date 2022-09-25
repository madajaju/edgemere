const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data Blue Print',
    static: true, // True is for Class methods. False is for object based.
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
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        if(inputs.hasOwnProperty('file')) {
            obj.version = inputs.file.version;
            obj.parameters = inputs.file.parameters;
            obj.identity = new Identity(inputs.file.identity);
            for(let i in inputs.file.adaptors) {
                let name = obj.name + '-' + i;
                name = name.toLowerCase();
                let adapt = inputs.file.adaptors[i];
                let adaptor = DataAdaptor.find(adapt.type);
                if(!adaptor) {
                    console.error("Could not find Adaptor:", adaptor);
                }
                let atemplate = new DataAdaptorTemplate({name:name, adaptor:adaptor, args: adapt.args});
                obj.addToAdaptors(atemplate);
            }
            for(let i in inputs.file.dataflows) {
                let df = inputs.file.dataflows[i];
                let dataflow = DataFlow.find(df.type);
                if(!dataflow) {
                    console.error("Could not find Data AWorkFlow:", i);
                }
                let name = obj.name + '-' + i;
                let sources = [];
                let sinks = [];
                for(j in df.sources) {
                    sources.push(obj.name + '-' + df.sources[j]);
                }
                for(j in df.sinks) {
                    sinks.push(obj.name + '-' + df.sinks[j]);
                }
                let dfTemplate = new DataFlowTemplate({name: name, flow: dataflow, sources: sources, sinks: sinks});
                obj.addToFlows(dfTemplate);
            }
        }
        return obj;
    }
};
