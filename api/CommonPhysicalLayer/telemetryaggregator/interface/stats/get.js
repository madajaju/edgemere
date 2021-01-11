const path = require('path');

module.exports = {
    friendlyName: 'getStats',
    description: 'get the statstics for the aggregated device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        // Aggregate the statistics.
        if(env) {
            env.res.end(global.telemetry.stats);
        }
        if(!global.hasOwnProperty('telemetry') ){
            global.telemetry = {
                stats: {}
            }
        }
        return global.telemetry.stats;
    }
};
