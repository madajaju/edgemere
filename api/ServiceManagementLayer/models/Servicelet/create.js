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
        }
        return obj;
    }
};
