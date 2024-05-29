
    module.exports = {
    friendlyName: 'group/create',
    description: 'Allows to create a new group',
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
 

    fn: function (obj, inputs, env) { return; }
};
