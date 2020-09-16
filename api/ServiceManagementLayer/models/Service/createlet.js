const path = require('path');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Stack',
    static: false, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {},

    fn: (obj, inputs, env) => {
        // Check that the environment exists. If it does not create it.
        let slet = new Servicelet({
            name: inputs.name,
            env: inputs.env,
            parent: inputs.stacklet,
            service: obj,
            file: inputs.file
        });
        return slet;
    }
};
