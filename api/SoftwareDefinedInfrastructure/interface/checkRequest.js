const Service = require('ailtire/src/Server/Service');
module.exports = {
    friendlyName: 'checkRequest',
    description: 'Check the status of the request',
    inputs: {
        request: {
            description: 'Cloud to request the Resources',
            type: 'obj',
            required: true
        },
    },
    exits: {},


    fn: function (inputs, env) {
        let rqst = inputs.request;
        let ready = true;
        // Check that all of the resources are Ready.
        for(let i in rqst.resources) {
            let resource = rqst.resources[i];
            if(resource.state !== 'Ready') {
                ready = false;
            }
        }
        if(ready) {
            rqst.satisfied();
        }
    }

};
