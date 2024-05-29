
class Hardware {
    static definition = {
        name: 'Hardware',
        description: 'The "Hardware" class, part of the "cpl" package, represents the physical hardware of a device, providing methods to manage attributes like its name and capabilities, and functions for addition of stats, enabling or disabling the hardware, and factory creation based on properties.',
        unique: false,
        extends: false,
        
        attributes: {
    "name": {
        "type": "string",
        "description": "Name of the hardware"
    },
    "ename": {
        "type": "string",
        "description": "Extended Name of the hardware"
    }
},
        
        associations: {
    "profile": {
        "type": "PhysicalProfile",
        "cardinality": 1,
        "composition": true,
        "name": "profile"
    },
    "device": {
        "type": "Device",
        "cardinality": 1,
        "composition": false,
        "owner": false,
        "name": "device"
    },
    "resources": {
        "type": "Resource",
        "cardinality": "n",
        "composition": false,
        "owner": false,
        "name": "resources"
    }
},
        
        statenet: {
    "Init": {
        "events": {
            "create": {
                "Enabled": {}
            }
        }
    },
    "Enabled": {
        "events": {
            "disable": {
                "Disabled": {}
            }
        }
    },
    "Disabled": {
        "events": {
            "enable": {
                "Enabled": {}
            }
        }
    }
},
        
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = { color: "#cccccc", border:"#000000"};
                if(options) {
                    material = options;
                }
                return `<circle cx="0" cy="0" r=10 style="fill:${material.color};stroke:${material.border};stroke-width:1; stroke-dasharray:3;" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#cccccc; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for(let i in materials) {
                    retval += `<a-entity id="Hardware3D${i}">` +
                        `<a-sphere radius="10" material="${materials[i]}" ></a-sphere>` +
                        `</a-entity>`;
                }
                return retval;
            },
        }
    }
}
module.exports = Hardware;
