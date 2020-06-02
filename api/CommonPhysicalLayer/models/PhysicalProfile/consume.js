const path = require('path');

module.exports = {
    friendlyName: 'consume',
    description: 'Consume the requirements, part or all of the requirements',
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
        // Check that the requirement
        //
        let name = obj.available.name;
        let value = requirements.findDeep({value:name});
        // Should be able to consume part of the values from each hardware.
        // So we need to figure out how much is actually consumed from each metric.
        if(value) {
            let rvalue = value.copy();
            found = obj.available.consume({value: value});
            if(found) {
                obj.reserved.consume({value:rvalue});
            }
        }
        // found = requirements.lessThanEq({value: obj.available});
        return found;
    }
};



