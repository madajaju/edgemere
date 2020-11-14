const path = require('path');
const si = require('systeminformation');

module.exports = {
    friendlyName: 'get',
    description: 'get the statstics for the device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {
        success: {},
        json: {},
        notFound: {
            description: 'No item with the specified ID was found in the database.',
        }
    },

    fn: async function (inputs, env) {
        console.log("Getstats called");
        let valueObject = {
            cpu: '*',
            mem: '*',
            currentLoad: '*',
            fsSize: '*',
        };
        let stats = await si.get(valueObject);
        return stats;
    }
};
