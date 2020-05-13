const path = require('path');

module.exports = {
    friendlyName: 'provision',
    description: 'Provision Hardware to meet the requirements',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        requirements: {
            description: 'Requirements for the Provision',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },

    exits: {},

    fn: function (obj, inputs, env) {
        let hardware = [];
        for (let i in obj.hardware) {
            let hw = obj.hardware[i];
            // this should be a different method that consumes the requirementment.
            // And returns what is left for another hardware to consume.
            // When the requirements are completely consumed it should be empty.
            if(hw.profile.satisfies(inputs.requirements)) {
                // Remove the requirement from the available
                // Remove from reserved
            }
        }
        return hardware;
    }
};
