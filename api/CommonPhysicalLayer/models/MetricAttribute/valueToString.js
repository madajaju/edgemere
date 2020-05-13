const path = require('path');

module.exports = {
    friendlyName: 'valueToString',
    description: 'Change to string Metric Consumeable',
    static: false, // True is for Class methods. False is for object based.
    inputs: {
    },

    exits: {},

    fn: function (obj, inputs) {
        let smap = {};
        let retval = [];
        for(let i in obj.value) {
            if(!smap.hasOwnProperty(obj.value[i])) {
               smap[obj.value[i]] = 0;
            }
            smap[obj.value[i]]++;
        }
        for(let name in smap) {
            retval.push(`${name} - ${smap[name]}`);
        }
        return retval;
    }
};

