
    module.exports = {
    friendlyName: 'aimodel/list',
    description: 'Returns a list of AI models',
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
