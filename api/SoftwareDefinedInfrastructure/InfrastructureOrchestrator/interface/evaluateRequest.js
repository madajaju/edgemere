module.exports = {
    friendlyName: 'evaluateRequest',
    description: 'Evaluate Request against policies and select the appropriate reservations from the Common Physical Layer',
    inputs: {
        request: {
            description: 'Request to evaluate',
            type: 'object',
            required: true
        },
    },
    exits: {},


    fn: async function (inputs, exits) {
        // TODO: look at the polcies for provisioning resources on devices.
        // Right now just select the first reservation one and reject the others.
        inputs.request.evaluated();
        let selected = false
        for (let i in inputs.request.reservations) {
            let reserve = inputs.request.reservations[i];
            if (!selected) {
                selected = true;
                reserve.confirm();
            }
            else {
                reserve.free();
            }
        }
        if(!selected) {
            inputs.request.failed({message:"No devices available for the requirements"});
        }
    }
};
