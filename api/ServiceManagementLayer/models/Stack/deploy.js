const path = require('path');

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
        let stacklet = null;
        if(obj.stacklets.hasOwnProperty(obj.name + '-' + deployEnv.name)) {
            stacklet = obj.stacklets[obj.name + '-' + deployEnv.name];
        }
        // Calculate the args based on what was passed in and what is in the definition.
        args = "";
        let sinstance = new StackInstance({name:siname,stacklet:stacklet, args:args});
        // Iterate over the stacklet and create instances for each stack or service.
        for(let i in stacklet.servicelets) {
            let servicelet = stacklet.servicelets[i];
            let tag = inputs.siname + servicelet.name;
            let args = inputs.args;
            let servicei = servicelet.deploy(tag, deployEnv, args);
            sinstance.addToServices(servicei);
        }

        obj.addToInstances(sinstance);
        stacklet.addToInstances(sinstance);
        return sinstance;

    }
};
