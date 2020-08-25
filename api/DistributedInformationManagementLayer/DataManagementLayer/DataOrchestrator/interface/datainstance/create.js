const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Data Instance from a Data Reference',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        dataref: {
            description: 'This is a Data Reference that should be turned into a Data Instance',
            type: 'json', // string|boolean|number|json
            required: false
        },
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
        // Create the Data Instance from the information in the Data Reference.
        // The Data Reference will be evaluated and the query will be used to find all of the Data that matches the query.
        // A Data Instance will be created for each DataSource connected to the resultant query.
        // The Name of the DataInstance will be the name of the DataReference with a counter on the number of data instances.
        // Set the DataInstance in the DataReference.
        let dref = inputs.dataref;
        let queryResults = [true]; // for now just put one datainstance for each datareference
        let i = 0;
        for(let j in queryResults) {
            let dname = dref.name + i++;
            let datai = new DataInstance({name: dref.name})
            dref.addToInstances(datai);
        }
        dref.provisioned();
    }
};
