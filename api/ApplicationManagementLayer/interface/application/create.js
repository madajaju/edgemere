
    module.exports = {
    friendlyName: 'application/create',
    description: 'Creates a new application',
    static: true,
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
 

    fn: function (obj, inputs, env) {
                    return;
                }
};
