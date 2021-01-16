const AService = require('ailtire/src/Server/AService');

module.exports = {
    friendlyName: 'reserve',
    description: 'Reserve a Data Instances from a Data Request',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        request: {
            description: 'This is the data request to get the reservations',
            type: 'ref', // string|boolean|number|json
            required: true
        },
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        // Create a Data Request from the Data Reference
        let dreq = inputs.request;
        if(typeof env === 'object') {
            dreq = env.req.body.request;
        }

        if(typeof dreq !== 'object') {
            dreq = DataRequest.find(dreq);
            if(!dreq) {
                if(env.res) {
                    env.res.end('Not Found');
                }
                return null;
            }
        }
        // Find all of the data that could match the request.S
        // Query the Meta-Data Manager.
        let data = await AService.call('diml.dml.fmdm.query', {expression:dreq.query});
        // Create a Data Reservation for each data item returned
        for(let i in data) {
            let datum = data[i];
            let datares = new DataReservation({data:datum, request:dreq});
            dreq.addToReservations(datares);
        }

        dreq.selected();
        if(env.res) {
            env.res.end({results: dreq.toJSON()});
        }
        return dreq;
    }
};
