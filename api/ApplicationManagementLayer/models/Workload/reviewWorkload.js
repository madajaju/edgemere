module.exports = {
    friendlyName: 'reviewWorkload',
    description: 'Reviews and analyses applications performances within the workload',
    static: false,
    inputs: {},


    exits: {
        json: (obj) => {
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
