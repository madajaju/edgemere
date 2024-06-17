
module.exports = {
    name: "Manage Asset Connectivity",
    description: "Description of workflow to manage connection of assets to devices",
    activities: {
        "Init": {"description": "Start connectivity process",
"actor": "Actor",
"package": "PhysicalWorld",
'inputs': {'asset': {"description": "The asset to be connected",
"type": "ref",
"required": "true",
},
'device': {"description": "The device to be connected to",
"type": "ref",
"required": "true",
},
},
'next': {'AssetDigitalDeviceConnectivity': {'inputs': {},
},
},
'outputs': {'status': {"description": "Connected status of the device",
"fn": (activity) => { return "Connected"; },
},
},
"name": "Init",
},
"AssetDigitalDeviceConnectivity": {'inputs': {'asset': {"description": "Physical asset",
"type": "ref",
},
'device': {"description": "Digital device",
"type": "ref",
},
},
"name": "AssetDigitalDeviceConnectivity",
"package": "PhysicalWorld",
'next': {},
} 
    }
};