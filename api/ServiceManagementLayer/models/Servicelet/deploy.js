
module.exports = {
    friendlyName: 'deploy',
    description: 'Deploy a Servicelet',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        tag: {
            description: 'Tag of the deployment of the stack. This is used to reference the deployed stack.',
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
        // Provision the Data References
        for(let i in obj.data) {
            let dref = obj.data[i];
            dref.provision();
        }
        // Calculate the args based on what was passed in and what is in the definition.
        args = "";
        let sinstance = new ServiceInstance({name:siname,servicelet:obj, args:args});
        // Iterate over the stacklet and create instances for each stack or service.
        /* for(let i in stacklet.servicelets) {
            let servicelet = stacklet.servicelets[i];
            let tag = inputs.siname + servicelet.name;
            let args = inputs.args;
            servicelet.deploy(tag, deployEnv, args);
        }
         */

        obj.addToInstances(sinstance);
        return sinstance;
    }
};
