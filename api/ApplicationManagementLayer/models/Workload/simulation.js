
    module.exports = {
    friendlyName: 'simulation',
    description: 'Simulates workload according to different scenarios',
    static: false,
    inputs: {scenario: {
    "type": "Scenario",
    "description": "The scenario of the simulation"
},
},


    exits: {json: (obj) => {
                        return obj;
                    },
success: (obj) => {
                        return obj;
                    },
notFound: (obj) => {
                        console.error("Object not Found:", obj);
                        return null;
                    },
},
 

    fn: function (obj, inputs, env) { return; }
};
