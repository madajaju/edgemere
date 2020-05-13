const path = require('path');

module.exports = {
    friendlyName: 'satisfies',
    description: 'Satisfies the requirements, part or all of the requirements',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        request: {
            description: 'Requirements to satisfy',
            type: 'object',
            required: true
        }
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        // inputs.request
        let found = false;
        let requirements = inputs.request.requirements;
        found = requirements.lessThanEq({value: obj.available});
        return found;
    }
};



