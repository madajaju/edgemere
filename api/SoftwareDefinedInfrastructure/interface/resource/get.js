module.exports = {
    friendlyName: 'get',
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
    fn: function (inputs, env) {
        // TODO: look at the polciies for provisioning resources on devices.
        inputs = env.req.body;
        let resources;
        let cloud = Cloud.find(inputs.cloud);
        if (!cloud) {
            env.res.json({error: "Could not find cloud:" + inputs.cloud});
            return;
        }

        // Create a request for the requirements.
        let request = new Request({name: inputs.name, cloud: cloud});
        cloud.addToRequests(request);
        request.requirements = Metric.factory({name: "", value: inputs.requirements});
        cloud.reserve({request: request});
        env.res.send({request: request.toJSON});
    }

};
