const path = require('path');
const bent = require('bent');

module.exports = {
    friendlyName: 'setParent',
    description: 'Set the parent for the producer to report to',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        url: {
            description: 'Parent of the Telemetry Producer',
            type: 'string', // string|boolean|number|json
            required: true
        },
        name: {
            description: 'Name of the parent',
            type: 'string', // string|boolean|number|json
            required: false
        }
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        let telemetryParent = inputs.url;
        global.postParent = bent(`http://${telemetryParent}/`, 'POST', 'json', 200);
        return "Made It";
    }
};
