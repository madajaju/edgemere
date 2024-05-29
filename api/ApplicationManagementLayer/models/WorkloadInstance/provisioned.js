
    module.exports = {
    friendlyName: 'provisioned',
    description: 'Method to change the state of the workload instance to provisioned.',
    static: false,
    inputs: {},


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
