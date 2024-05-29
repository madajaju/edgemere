
class Device {
    static definition = {
        name: 'Device',
        description: 'The "Device" class in the "cpl" package represents a device in a data center and provides functions for device management such as creation, update, addition to hardware, enabling, disabling, and reserving resources, along with key attributes like device name, hostname, and type.',
        unique: false,
        extends: false,
        
        attributes: {
    "name": {
        "type": "string",
        "description": "Name of the device"
    },
    "ename": {
        "type": "string",
        "description": "Extended Name of the device"
    },
    "hostname": {
        "type": "string",
        "description": "Hostname of the device"
    },
    "type": {
        "type": "string",
        "description": "Type of the Device"
    }
},
        
        associations: {
    "profile": {
        "type": "PhysicalProfile",
        "cardinality": 1,
        "composition": true,
        "name": "profile"
    },
    "hardware": {
        "type": "Hardware",
        "cardinality": "n",
        "composition": false,
        "owner": true,
        "via": "device",
        "name": "hardware"
    },
    "datacenter": {
        "type": "DataCenter",
        "cardinality": 1,
        "composition": false,
        "owner": false,
        "name": "datacenter"
    },
    "parent": {
        "type": "AggregatedDevice",
        "cardinality": 1,
        "composition": false,
        "owner": false,
        "name": "parent"
    }
},
        
        statenet: {
    "Init": {
        "description": "In the initial state",
        "events": {
            "create": {
                "DeviceCreated": {}
            },
            "reserve": {
                "Reserved": {}
            }
        }
    },
    "DeviceCreated": {
        "description": "Device has been created",
        "events": {
            "update": {
                "DeviceUpdated": {}
            },
            "addTo": {
                "AddedTo": {}
            },
            "removeFrom": {
                "RemovedFrom": {}
            },
            "addToHardware": {
                "AddedToHardware": {}
            },
            "disable": {
                "Disabled": {}
            },
            "getReservations": {
                "ReservationsRetrieved": {}
            },
            "provision": {
                "Provisioned": {}
            },
            "reserve": {
                "Reserved": {}
            }
        },
        "actions": {
            "entry": {
                "initiateDevice": "Function to initiate the device after creation"
            },
            "exit": {
                "logDeviceStatus": "Function to log the status of the device when moving from this state"
            }
        }
    },
    "DeviceUpdated": {
        "description": "Device has been updated",
        "events": {
            "destroy": {
                "Destroyed": {}
            }
        },
        "actions": {
            "entry": {
                "updateStatus": "Function to update the status of device after an update"
            },
            "exit": {}
        }
    },
    "AddedTo": {
        "description": "Device has been added to a device group",
        "events": {},
        "actions": {
            "entry": {
                "updateDeviceGroup": "Function to update the device group after a new device is added"
            },
            "exit": {}
        }
    },
    "RemovedFrom": {
        "description": "Device has been removed from a device group",
        "events": {},
        "actions": {
            "entry": {
                "updateDeviceGroup": "Function to update the device group after a device is removed"
            },
            "exit": {}
        }
    },
    "AddedToHardware": {
        "description": "Device has been added to hardware",
        "events": {},
        "actions": {
            "entry": {
                "updateHardware": "Function to update the hardware after a device is added"
            },
            "exit": {}
        }
    },
    "Disabled": {
        "description": "Device is inactive",
        "events": {
            "enable": {
                "Enabled": {}
            }
        },
        "actions": {
            "entry": {
                "disableAllFunctions": "Function to disable all functions of this device"
            },
            "exit": {}
        }
    },
    "ReservationsRetrieved": {
        "description": "Retrieved reservations for the device",
        "events": {},
        "actions": {
            "entry": {
                "displayReservations": "Function to display all the reservations for this device"
            },
            "exit": {}
        }
    },
    "Provisioned": {
        "description": "Hardware has been provisioned to meet specific requirements",
        "events": {},
        "actions": {
            "entry": {
                "setupHardware": "Function to setup the hardware according to the provision"
            },
            "exit": {}
        }
    },
    "Reserved": {
        "description": "A resource have been reserved through this device",
        "events": {},
        "actions": {
            "entry": {
                "reserveResource": "Function to reserve a resource through this device"
            },
            "exit": {}
        }
    },
    "Destroyed": {
        "description": "Device has been terminated",
        "events": {},
        "actions": {
            "entry": {
                "archiveData": "Function to archive all data related to this device"
            },
            "exit": {}
        }
    },
    "Enabled": {
        "description": "Device is active",
        "events": {
            "disable": {
                "Disabled": {}
            }
        },
        "actions": {
            "entry": {
                "enableAllFunctions": "Function to enable all functions of this device"
            },
            "exit": {}
        }
    }
},
        
        view: {
            color: "#cccccc",
            object2d: (options) => {
                // Triangle
                let material = {color: "#cccccc", border: "#000000"};
                if (options) {
                    material = options;
                }
                return `<polygon points="-10,10 10,10 0,-10 -10,10" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {
                let materials = {
                    '': `color:#cccccc; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for (let i in materials) {
                    retval += `<a-entity id="Device3D${i}">` +
                        `<a-cone radius-bottom="10" height="20" radialSegments="10" position="0 0 0" material="${materials[i]}" ></a-cone>` +
                        `</a-entity>`;
                }
                return retval;
            },
        }
    }
}
module.exports = Device;
