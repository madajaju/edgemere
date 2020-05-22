module.exports = {
    friendlyName: 'provision',
    description: 'Provision Resources based on the reservation.',
    inputs: {
        obj: {
            description: 'Reservation to use as the provision',
            type: 'object',
            required: true
        },
    },
    exits: {},


    fn: async function (inputs, exits) {
        // TODO: look at the polcies for provisioning resources on devices.
        // Right now just select the first reservation one and reject the others.
        let reserve = inputs.obj;
        // Create the resource. This should trigger the Common Physical Layer to spin up the resources.
    }

};
