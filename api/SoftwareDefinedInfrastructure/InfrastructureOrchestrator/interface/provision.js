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
        let request = reserve.request;
        let requirements = request.requirements;
        let device = reserve.device;
        let cloud = request.cloud;
        let resources = [];
        for (let i in reserve.device.hardware) {
            let hw = reserve.device.hardware[i];
            let resource = null;
            // this should be a different method that consumes the requirementment.
            // And returns what is left for another hardware to consume.
            // When the requirements are completely consumed it should be empty.
            // Remove the requirement from the available
            // Remove from reserved
            // Create Resources based on the hardware.
            // Create the resource. This should trigger the Common Physical Layer to spin up the resources.
            if(hw.profile.consume({request: request})) {
                if(!resource) {
                    resource = Resource.factory({name:request.name, value:hw});
                    resources.push(resource);
                    request.addToResources(resource);
                    cloud.addToResources(resource);
                }
                resource.addToHardware(hw);
                hw.addToResources(resource);
            }
        }
        for(let i in resources) {
            let resource = resources[i];
            resource.provision();
            // Change the state Provisioning.
            // This will trigger the CPL to do something.
        }
        return resources;
    }

};
