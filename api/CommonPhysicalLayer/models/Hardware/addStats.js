const path = require('path');

module.exports = {
    friendlyName: 'addStats',
    description: 'Add Stats to the Hardware',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
       stats: {
            description: 'Object Map of the stats',
            type: 'json', // string|boolean|number|json
            required: true
        },
    },
    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        if(inputs.stats.hasOwnProperty('available')) {
            let metric = Metric.factory({value: inputs.stats.available});
            obj.profile.available.set({value: metric});
            console.log("Here");
        }
        if(inputs.stats.hasOwnProperty('metrics')) {
            let metric = Metric.factory({value: inputs.stats.metrics});
            obj.profile.metrics.set({value: metric});
        }
        if(inputs.stats.hasOwnProperty('capabilities')) {
            let metric = Metric.factory({value: inputs.stats.capabilities});
            obj.profile.capabilities.set({value: metric});
        }

        // Create a CompositeMetric that has a name of the subclass name as the name of the compositemetric.
        return obj;
    }
};
