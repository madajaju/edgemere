const path = require('path');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Stack',
    static: false, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {},

    fn: (obj, inputs, env) => {
        obj.name = inputs.name;
        obj.env = inputs.env;
        obj.stack = inputs.stack;
        if(inputs.hasOwnProperty('file')) {
            // obj.file.data = Contains data references
            for(let dname in inputs.file.data) {
                let datum = inputs.file.data[dname];
                let drefName = obj.name + '-' + dname;
                let dref = new DataReference({name: drefName, shortName: dname, query: datum});
                obj.addToData(dref);
            }
            // obj.file.resources = Contains resource requirements for the stacklet
            // obj.file.parameters = Parameters
            // obj.file.environment = Environment Variables
            // obj.file.services = Contains the services for the stacklet
            for(let sname in inputs.file.services) {
                let serviceName = inputs.file.services[sname].type;
                let service = Service.find(serviceName);
                if(!service) {
                    console.error("Could not find the Service! ", serviceName);
                }
                else {

                    let opts = {
                        name: obj.name + '-' + sname,
                        env: inputs.env,
                        stacklet: obj,
                        file: inputs.file.services[sname]
                    }
                    let slet = service.createlet(opts);
                    // Servicelet or Stacklet depending on the type of Service.
                    obj.addToServicelets(slet);
                }
            }
        }
        return obj;
    }
};
