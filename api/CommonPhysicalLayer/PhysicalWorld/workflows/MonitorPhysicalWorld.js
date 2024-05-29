
module.exports = {
    name: "Monitor Physical World",
    description: "Description of workflow to monitor the physical world",
    activities: {
        "Init": {"description": "Start monitoring process",
"actor": "Actor",
"package": "PhysicalWorld",
'inputs': {'asset': {"description": "The asset to be monitored",
"type": "ref",
"required": "true",
},
},
'next': {'Continuous Monitoring': {'inputs': {},
},
},
'outputs': {'status': {"description": "Monitoring status of the asset",
"fn": (activity) => { return "Active"; },
},
},
"name": "Init",
},
"Continuous Monitoring": {"package": "PhysicalWorld",
'inputs': {'asset': {"description": "Physical asset",
"type": "ref",
},
},
"name": "Continuous Monitoring",
'next': {},
} 
    }
};