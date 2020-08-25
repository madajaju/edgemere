const path = require('path');

module.exports = {
    friendlyName: 'assignData',
    description: 'Assign Data Instances from the Data Reference',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        servicelet: {
            description: 'ServiceInstance to connect the Data Reference Instance',
            type: 'ref', // string|boolean|number|json
            required: true
        },
        dataReference: {
            description: 'Data Reference to get the instances',
            type: 'ref', // string|boolean|number|json
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

    fn: function (inputs, env) {
        // inputs contains the obj for the this method.
        let servicelet = inputs.servicelet;
        let dref = inputs.dataReference;

    }
};
