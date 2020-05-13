const path = require('path');

module.exports = {
    friendlyName: 'getReservations',
    description: 'Get reservation from the requirements',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
        requirements: {
            description: 'Requirements for the Reservation',
            type: 'YAML', // string|boolean|number|json
            required: true
        },
    },

    exits: {
    },

    fn: function (obj, inputs, env) {
        // inputs contains the obj for the this method.
        // obj has the obj for the method.
        // Make sure there is enough of the requirement available for the reservation.
        let satisfied = false;
        for(let i in inputs.requirements) {
            let requirement = inputs.requirements[i];
            if(obj.profile.satisfies(requirement)) {
                satisfied = true;
            }
            else {
                satisfied = false;
            }
        }
        if(satisfied) {
            // Create the reservation
        }
    }
};
