
module.exports = {
    friendlyName: 'report',
    description: 'report the statstics for a device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'The name of the device',
            type: 'string', // string|boolean|number|json
            required: true
        },
        stats: {
            description: 'The statistics for the device',
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
        console.log("Report:", inputs.name);
        if(!global.hasOwnProperty('telemetry')) {
            global.telemetry = {
                stats: {}
            }
        }
        if(!global.telemetry.stats) {
            global.telemetry.stats = {};
        }
        if(!global.telemetry.stats.hasOwnProperty(inputs.name)) {
            global.telemetry.stats[inputs.name] = {};
        }
        global.telemetry.stats[inputs.name] = inputs.stats;
        if(env && env.res) {
            env.res.end("Done");
        }
    }
};
