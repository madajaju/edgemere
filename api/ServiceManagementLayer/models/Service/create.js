const path = require('path');
const Service = require('ailtire/src/Server/Service');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Service',
    static: false, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {},

    fn: (obj, inputs, env) => {
        obj.name = inputs.name;
        obj.version = inputs.file.version;
        obj.parameters = inputs.file.parameters;
        for (let envName in inputs.file.environments) {
            // Check that the environment exists. If it does not create it.
            let environ = Environment.find(envName);
            if (!environ) {
                console.log("Creating new Environment:", envName);
                environ = new Environment({name: envName});
            }
            let servicelet = new Servicelet({
                name: obj.name + '-' + environ.name,
                env: environ,
                service: obj,
                file: inputs.file.environments[envName]
            });
            obj.addToServicelets(servicelet);
        }
        return obj;
    }
};
