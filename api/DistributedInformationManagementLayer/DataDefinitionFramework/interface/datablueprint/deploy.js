const path = require('path');

module.exports = {
    friendlyName: 'deploy',
    description: 'Description of the action',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name instance of the blueprint',
            type: 'string', // string|boolean|number|json
            required: true
        },
        blueprint: {
            description: 'Name of the blueprint',
            type: 'string', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'File of with the parameters for the deployment',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
        sources: {
            description: 'Names and values of the sources for the blueprint',
            type: 'string', // string|boolean|number|json
            required: false
        },
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        // inputs contains the obj for the this method.
        let name = inputs.name;
        inputs.file = env.req.body.file;
        let blueprint = DataBluePrint.find(inputs.blueprint);
        if (!blueprint) {
            env.res.end("Blueprint not found:" + inputs.blueprint);
            return;
        }
        let retval = new DataBluePrintInstance({name: name, blueprint: blueprint});
        if (inputs.hasOwnProperty('file') && inputs.file) {
            if (inputs.file.hasOwnProperty('parameters')) {

            }
            if (inputs.file.hasOwnProperty('sources')) {
                for (let i in inputs.file.sources) {
                    let source = inputs.file.sources[i];
                    // This is the name of the DataSource already created.
                    let dataSource = null;
                    if (typeof source === 'string') {
                        dataSource = DataSource.find(source);
                    }
                    // Create a data source with the information from the file.
                    if (source.hasOwnProperty('adaptor')) {
                        let adaptor = DataAdaptor.find(source.adaptor);
                        if (!adaptor) {
                            console.error("Could not find the Data Adaptor: " + source.adaptor);
                            env.res.end("Could not find the Data Adaptor:" + source.adaptor);
                            return;
                        }
                        dataSource = new DataSource({adaptor: adaptor, name: i, parameters: source.parameters});
                    }
                    // Check if the data sources is in the blueprint under the adaptors named i nthe blue print.

                    if (!blueprint.adaptors.hasOwnProperty(blueprint.name + '-' + dataSource.name)) {
                        console.error("Data source is not part of the blueprint:" + dataSource.name);
                    }
                    retval.addToSources(dataSource);
                    dataSource.addToblueprints(retval);
                }
            }
            if (inputs.file.hasOwnProperty('identity')) {
                let identity = new Identity(inputs.file.identity);
                retval.identity = identity;
            }
        }
        if (inputs.hasOwnProperty('sources')) {
            let pairs = inputs.sources.split(',');
            for(let i in pairs) {
                let pair = pairs[i];
                let [name, value] = pair.split('=');
                // This is the name of the DataSource already created.
                let dataSource = DataSource.find(value);
                // Create a data source with the information from the file.
                let adaptorName = blueprint.name + '-' + name;
                adaptorName = adaptorName.toLowerCase();
                if (!blueprint.adaptors.hasOwnProperty(adaptorName)) {
                    console.error("Data source is not part of the blueprint:" + adaptorName);
                }
                retval.addToSources(dataSource);
                dataSource.addToblueprints(retval);

            }
        }
        blueprint.addToInstances(retval);

        // Now hook create the flow instances
        for (let i in blueprint.flows) {
            let flow = blueprint.flows[i];
            let iflow = new DataFlowInstance({dataflow: flow});
            for (let j in flow.sources) {
                let source = retval.sources[j];
                if (source) {
                    iflow.addToSources(source);
                } else {
                    console.error("Could not find the Data Source:", j);
                }
            }
            retval.addToFlows(iflow);
        }
        let jretval = retval.toJSON;
        env.res.json(jretval);
        return jretval;
    }
};
