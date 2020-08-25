const path = require('path');

module.exports = {
    friendlyName: 'simulate',
    description: 'Simulate data in the data source',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'Name of the DataSource to simulate',
            type: 'string', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'file that contains the data to simulate',
            type: 'YAML', // string|boolean|number|json
            required: true
        }
    },

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: function (inputs, env) {
        // inputs contains the obj for the this method.
        let dataSource = DataSource.find(inputs.name);
        inputs.file = env.req.body.file;
        for (let name in inputs.file) {
            let datumDef = inputs.file[name];
            let datum = new Data({name: name, access: name});
            dataSource.addToData(datum);
            datum.addToConnection({name: 'filetype', value: datumDef.type, connection: name});
            if (datumDef.hasOwnProperty('type')) {
                datum.addToMetadata({name: 'type', value: datumDef.type});
            }
            if (datumDef.hasOwnProperty('tags')) {
                for (let i in datumDef.tags) {
                    let tag = datumDef.tags[i];
                    if (typeof tag === 'object') {
                        for (let j in tag) {
                            datum.addToMetadata({name: i, value: j});
                        }
                    } else {
                        datum.addToMetadata({name: i, value: tag});
                    }
                }
            }
        }
        env.res.end("Done");
    }
};
