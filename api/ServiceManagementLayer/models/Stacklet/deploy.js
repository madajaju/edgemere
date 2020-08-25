const path = require('path');
const Service = require('ailtire/src/Server/Service');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'deploy',
    description: 'Deploy a Stack',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        tag: {
            description: 'Tag of the deployment of the stack. This is used to reference the deployed stack.',
            type: 'string', // string|boolean|number|json
            required: false
        },
        env: {
            description: 'Name of the deployment environment',
            type: 'string', // string|boolean|number|json
            required: false
        },
        args: {
            description: 'Arguments passed into the stack deployment',
            type: 'json', // string|boolean|number|json
            required: false
        }

    },

    exits: {},

    fn: (obj, inputs, env) => {
        let deployEnv = null;

        if(inputs.env) {
            deployEnv = Environment.find(inputs.env);
            if(!deployEnv) {
                throw new Error("Environment could not be fould for stack deploy:", inputs.env);
            }
        }
        let siname = obj.name;
        if(!obj.instances) {
            siname += '0';
        }
        else {
            siname += obj.instances.length;
        }
        if(inputs.tag) {
            siname = inputs.tag;
        }
        // Check if the tag is already used and running if it is then throw and exception.
        /* There can be more than one instance with the same name. the IDs will be different. So no problem.
        let sinstance = StackInstance.find(siname);
        if(sinstance) {
            if(sinstance.state === "Failed" || sinstance.state === "Completed" ) {

            }
        }
         */
        // Calculate the args based on what was passed in and what is in the definition.
        let sinstance = new StackInstance({name:siname,stacklet:obj, args:args});
        // Iterate over the stacklet and create instances for each stack or service.
        // Go in and get the stacklet definition.
        let stacklet = null;
        let stackletName = obj.stack.name + '-' + obj.env.name;
        if(obj.stack.stacklets.hasOwnProperty(stackletName)) {
            stacklet = obj.stack.stacklets[stackletName];
        }
        else {
            console.error("Could not find the stacklet for:", obj.env.name);
        }

        for(let i in stacklet.servicelets) {
            let servicelet = stacklet.servicelets[i];
            let tag = siname + servicelet.name;
            let args = inputs.args;
            let servicei = servicelet.deploy(tag, deployEnv, args);
            sinstance.addToServices(servicei);
        }

        obj.addToInstances(sinstance);
        obj.stack.addToInstances(sinstance);
        return sinstance;
    }
};
