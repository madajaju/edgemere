module.exports = {
  friendlyName: 'releaseResources',
  description: 'Release Resources from the SDI Layer with the given name',

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
    }
  },
  exits: {
  },


  fn: async function (inputs, exits) {


    // TODO: look at the polciies for provisioning resources on devices.

    // let requests = await sails.helpers.policy.evaluate.with({requests: inputs.requests});

    // For each request get the environment and ask the environment for reservations.
    // Iterate the cloud and ask for reservations.
    let resources;
    let cloud = inputs.cloud;
    let reservations = [];
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
  }

};
