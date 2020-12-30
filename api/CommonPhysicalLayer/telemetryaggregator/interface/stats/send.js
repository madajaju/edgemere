const path = require('path');
const bent = require('bent');
const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'send',
    description: 'send the statstics for the managing service',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the device for the statistics',
            type: 'string', // string|boolean|number|json
            required: true
        },
        stats: {
            description: 'Statistic to send to the parent',
            type: 'string', // string|boolean|number|json
            required: true
        }
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        let stats = inputs.stats;
        console.log("Sending Data:", inputs.name);
        // This is set when the socket is connected.
        // If the socket is not connected then don't send it.
        storeStats(stats);
        AEvent.emit("adevice.stats", {name:"Aggregator" + inputs.name, stats: global.telemetry.stats});
        if (global.parentPost) {
            try {
        //        await global.parentPost('report', {name: inputs.name, stats: global.telemetry.stats});
                // Clear the stats when it is successful;
                global.telemetry.stats = null;
            } catch (e) {
                console.log("Error Posting data:", e);
                storeStats(stats);
            }
        } else {
            storeStats(stats);
        }
    }
};

function storeStats(stats) {
    if (!global.hasOwnProperty('telemetry')) {
        global.telemetry = {stats: {}};
    }
    // Nothing currently stored.
    if (!global.telemetry.stats) {
        global.telemetry.stats = stats;
    }
    else {
        global.telemetry.stats = stats;
    }
}
