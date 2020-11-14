// const path = require('path');

module.exports = {
    friendlyName: 'report',
    description: 'report the statstics for a device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        console.log("List reported for:", global.telemetry.stats);
        if(env) {
            env.res.send(global.telemetry.stats);
        }
        return global.telemetry.stats;
    }
};
