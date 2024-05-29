
    module.exports = {
    friendlyName: 'assignApplication',
    description: 'Assigns an application to the workload',
    static: false,
    inputs: {application: {
    "type": "Application",
    "description": "Application to be assigned"
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
