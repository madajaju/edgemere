const path = require('path');

module.exports = {
    friendlyName: 'stats',
    description: 'get the Stats for the physical profile',
    static: false, // True is for Class methods. False is for object based.
    inputs: {},

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        let found = false;
        let retval = {
            capabilities: {},
            available: {},
            reserved: {},
        };
        let myRetval = _getStats(obj.capabilities, retval.capabilities);
        myRetval = _getStats(obj.available, retval.available);
        myRetval = _getStats(obj.reserved, retval.reserved);
        return retval;
    }
};

function _getStats(obj, retval) {
    if (obj.className === "MetricComposite") {
        for (let i in obj.values) {
            retval[i] = {};
            retval[i] = _getStats(obj.values[i],retval[i]);
        }
    } else if(obj.className === "MetricConsumeable") {
        retval = obj.value;
    } else {
        retval = obj.value.length;
    }
    return retval;
}


