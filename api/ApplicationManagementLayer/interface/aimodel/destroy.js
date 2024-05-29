
    module.exports = {
    friendlyName: 'aimodel/destroy',
    description: 'Destroys a specified AI model',
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
