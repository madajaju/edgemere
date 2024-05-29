
class PhysicalAsset {
    static definition = {
        name: 'PhysicalAsset',
        description: 'The PhysicalAsset class in the "pw" package represents a physical asset, with attributes such as name and type of asset, operations like creating, destroying, updating, adding to, removing from, controlling, and monitoring the asset, and associations with location, sensor, and communication pathways.',
        unique: false,
        extends: false,

        attributes: {
    "name": {
        "type": "string",
        "description": "This is the unique identifier for the physical asset."
    },
    "assetType": {
        "type": "string",
        "description": "This specifies the category or group of the asset."
    }
},

        associations: {
    "location": {
        "type": "Location",
        "cardinality": 1,
        "composition": false,
        "owner": false,
        "name": "location"
    },
    "sensor": {
        "type": "Sensor",
        "cardinality": "n",
        "composition": true,
        "owner": true,
        "name": "sensor"
    },
    "pathway": {
        "type": "CommunicationPathway",
        "cardinality": "n",
        "composition": false,
        "owner": false,
        "name": "pathway"
    }
},

        statenet: {
    "Init": {
        "description": "Initial State",
        "events": {
            "create": {
                "Active": {}
            }
        }
    },
    "Active": {
        "description": "State when asset is actively in use",
        "color": "#bbbbbb",
        "events": {
            "deactivate": {
                "Inactive": {
                    "condition": {
                        "description": "Check if inactive",
                        "action": "checkIfInactive"
                    },
                    "action": {
                        "description": "Deactivate asset",
                        "action": "deactivate"
                    }
                }
            },
            "startMonitoring": {
                "Monitoring": {
                    "condition": {
                        "description": "Check for sensors",
                        "action": "hasSensors"
                    },
                    "action": {
                        "description": "Start Monitoring",
                        "action": "startMonitoring"
                    }
                }
            },
            "attachSensor": {
                "Active": {
                    "action": {
                        "description": "Attach sensor",
                        "action": "attachSensor"
                    }
                }
            },
            "attachPathway": {
                "Active": {
                    "action": {
                        "description": "Attach pathway",
                        "action": "attachPathway"
                    }
                }
            }
        }
    },
    "Inactive": {
        "description": "State when asset is not in use",
        "color": "#aaaaaa",
        "events": {
            "activate": {
                "Active": {
                    "condition": {
                        "description": "Check if active",
                        "action": "checkIfActive"
                    },
                    "action": {
                        "description": "Activate asset",
                        "action": "activate"
                    }
                }
            },
            "destroy": {
                "Destroyed": {
                    "action": {
                        "description": "Destroy asset",
                        "action": "destroy"
                    }
                }
            }
        }
    },
    "Monitoring": {
        "description": "State when asset is being monitored",
        "color": "#cccccc",
        "events": {
            "stopMonitoring": {
                "Active": {
                    "action": {
                        "description": "Stop Monitoring",
                        "action": "stopMonitoring"
                    }
                }
            },
            "monitorCondition": {
                "Monitoring": {
                    "action": {
                        "description": "Monitor Condition",
                        "action": "monitorCondition"
                    }
                }
            }
        }
    },
    "Destroyed": {
        "description": "State when asset is destroyed",
        "color": "#dddddd"
    }
},

    }
}
module.exports = PhysicalAsset;
