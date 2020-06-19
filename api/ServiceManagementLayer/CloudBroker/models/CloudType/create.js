const path = require('path');

module.exports = {
    friendlyName: 'create',
    description: 'Create a Cloud Type',
    static: true, // True is for Class methods. False is for object based.
    inputs: {
        name: {
            description: 'name of the Cloud Type',
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
        let rmap = {};
        if (inputs.hasOwnProperty('file')) {
            for (let rtname in inputs.file.resourcetypes) {
                let rt = inputs.file.resourcetypes[rtname];
                rt.name = rtname;
                let rtObj = new ResourceInstanceType({name: rt.name, type: rt.type});
                for (let cname in rt.costs) {
                    let cost = new ResourceCost({name: cname, amount: rt.costs[cname]});
                    rtObj.addToCosts(cost);
                }
                if (rt.hasOwnProperty('capabilities')) {
                    let reserved = {};
                    for (let i in inputs.capabilities) {
                        reserved[i] = 0;
                    }
                    rtObj.profile = new PhysicalProfile({
                        name: rt.type,
                        capabilities: rt.capabilities,
                        available: rt.capabilities,
                        reserved: reserved
                    });
                } else {
                    rtObj.profile = new PhysicalProfile();
                }
                rmap[rtObj.name] = rtObj;
                obj.addToinstanceTypes(rtObj);
            }
            for(let mname in inputs.file.assetmap) {
                let rname = inputs.file.assetmap[mname];
                obj.addToassetmap({name:mname, value:rmap[rname]});
            }
        }
        return obj;
    }
};
