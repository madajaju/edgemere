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
        // Now find all of the sources
        // Check against policies and determine what to do with the data.
        // 1. leave the data where it is
        // 2. move the data
        // 3. mount the data.
        // 4. ...
        for(let i in dreq.reservations) {
           let dres = dreq.reservations[i];
           // For now leave the data where it is.
            // in the future change the datasource on the data element after the data has been moved or mounted.
        }
        // Now provision the data instance at the with the data in the new locations.
        for(let i in dreq.reservations) {
            let dres = dreq.reservations[i];
            let datai = new DataInstance({name: dreq.name});
            datai.addToData(dres.data);
            dreq.addToInstances(datai);
        }
        dreq.satisfied();
        if(env.res) {
            env.res.end({results: dreq.toJSON()});
        }
        return dreq;
    }
};
