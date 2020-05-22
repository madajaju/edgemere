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
        let selected = false
        for (let i in inputs.obj.reservations) {
            let reserve = inputs.obj.reservations[i];
            if (!selected) {
                reserve.confirm();
            }
            else {
                reserve.free();
            }
        }
    }

};
