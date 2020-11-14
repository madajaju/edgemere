
module.exports = {
    friendlyName: 'show',
    description: 'report the statstics for a device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'The name of the device',
            type: 'object', // string|boolean|number|json
            required: true
        },
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        console.log("show reported for:", inputs.name);
        if(env) {
            env.res.send(global.telemetry.stats[inputs.name]);
        }
        console.log(global.telemetry.stats[inputs.name])
        return global.telemetry.stats[inputs.name];
    }
};
