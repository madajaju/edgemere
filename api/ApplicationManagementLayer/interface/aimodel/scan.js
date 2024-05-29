module.exports = {
    friendlyName: 'aimodel/scan',
    description: 'An interface designed to scan the AI model for potential malware or viruses.',
    static: true,
    inputs: {
        appName: {
            "type": "string",
            "description": "The name of the AI model to scan."
        },
    },


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


    fn: function (inputs, env) {
        return;
    }
};
