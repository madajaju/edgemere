const Service = require('ailtire/src/Server/Service');
module.exports = {
    friendlyName: 'getResources',
    description: 'Get Resources from the SDI Layer',

    inputs: {
        cloud: {
            description: 'Cloud to request the Resources',
            type: 'string',
            required: true
        },
        name: {
            description: 'The name of the Resource to create.',
            type: 'string',
            required: true
        },
        requirements: {
            description: 'The Requirements to create the resource',
            type: 'YAML',
            required: true
        }
    },
    exits: {},


    fn: async function (inputs, env) {


        // TODO: look at the polciies for provisioning resources on devices.
        inputs = env.req.body;
        let resources;
        let cloud = Cloud.find(inputs.cloud);

        // Create a request for the requirements.
        let request = new Request({name: inputs.name, cloud: cloud});
        request.requirements = Metric.factory({name: "", value: inputs.requirements});
        let reservations = cloud.reserve({request: request});

        // Select the reservation based on the policies that has the best match.
        let selectedReservations = reservations;

        // now create the resources based on the selected reservations.
        for (let i in selectedReservations) {
            let reserve = selectedReservations[i];
            reserve.confirm();
            // Since we are talking across subsystems we should really send
            let hardware = Service.call('cpl.provision', {
                device: reserve.device,
                requirement: reserve.request.requirements
            });
            reserve.request.confirm();
        }
        /*
         // Only put reservations into the creation of the resource that match the cloud.
         for (let i in inputs.reservations) {
           if (inputs.reservations[i].cloud == cloud.id || inputs.reservations[i].cloud.id == cloud.id) {
             reservations.push(inputs.reservations[i]);
           }
         }
         resources = await sails.helpers.softwaredefinedinfrastructure.resource.create.with({
           name: inputs.name,
           reservations: reservations
         });
         return exits.success(resources);

         */
        env.res.json({reservations: reservations});

    }

};
