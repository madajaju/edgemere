
    module.exports = {
    friendlyName: 'provision',
    description: 'Method to provision the workload instance',
    static: false,
    inputs: {app: {
    "type": "Workload",
    "description": "Workload type application to provision"
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
