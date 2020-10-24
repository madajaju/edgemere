const path = require('path');

const AEvent = require('ailtire/src/Server/AEvent');

module.exports = {
    friendlyName: 'show',
    description: 'Show a Stack',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
       /* request: {
            description: 'Request for the reservation',
            type: 'object', // string|boolean|number|json
            required: true
        },
        */
    },

    exits: {},

    fn: (obj, inputs, env) => {

    }
};
