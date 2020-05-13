const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Device',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the device',
            type: 'string', // string|boolean|number|json
            required: true
        },
        file: {
            description: 'file with the definition',
            type: 'YAML', // string|boolean|number|json
            required: false
        },
    },

    exits: {},

    fn: function (obj, inputs) {
        // inputs contains the obj for the this method.
        obj.name = inputs.name;
        obj.profile = new PhysicalProfile();
        if(inputs.hasOwnProperty('file')) {
            for (let name in inputs.file.hardware) {
                let hw = inputs.file.hardware[name];
                hw.name = name;
                let hwObj = Hardware.factory({name: name, type: hw.type, capabilities: hw.capabilities});
                hwObj.ename = obj.name + '-' + name;
                obj.addToHardware(hwObj);
            }
        }
        return obj;
    }
};
