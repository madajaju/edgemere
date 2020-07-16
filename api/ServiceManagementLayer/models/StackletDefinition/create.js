const path = require('path');
const Service = require('ailtire/src/Server/Service');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Stack',
    static: false, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {},

    fn: (obj, inputs, env) => {
        obj.name = inputs.name;
        // obj.file.data = Contains data references
        // obj.file.resources = Contains resource requirements for the stacklet
        // obj.file.services = Contains the servics for the stacklet
        // obj.file.parameters = Parameters
        // obj.file.environment = Envoronment Variables
        if(obj.hasOwnProperty('file')) {
            for (let sname in obj.file.services) {
                let serviceDef = obj.file.services[sname];
                serviceDef
            }
        }
        for (let envName in inputs.file.environments) {
            // Check that the environment exists. If it does not create it.
            let environ = Environment.find(envName);
            if (!environ) {
                console.log("Creating new Environment:", envName);
                environ = new Environment({name: envName});
            }
            let stacklet = new Stacklet({
                name: obj.name + '-' + environ.name,
                env: environ,
                stack: obj,
                file: inputs.file.environments[envName]
            });
            obj.addToStacklets(stacklet);
        }
        return obj;
    }
};
