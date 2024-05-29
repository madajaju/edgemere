class PLC {
    static definition = {
        name: 'PLC',
        description: 'The "PLC" class, located in the "pw" package, represents a Programmable Logic Controller that has methods for creating, destroying, updating, and manipulating data, and it is capable of communication with assets and devices using a specific protocol.',
        unique: false,
        extends: 'CommunicationPathway',

        attributes: {
            "name": {
                "type": "string",
                "description": "Unique identifying name of the PLC"
            },
            "kind": {
                "type": "string",
                "description": "Type or model of the PLC"
            },
            "protocol": {
                "type": "string",
                "description": "Communication protocol used by the PLC"
            }
        },

        associations: {
            "asset": {
                "name": "asset",
                "description": "Association with PhysicalAsset",
                "type": "PhysicalAsset",
                "cardinality": 1,
                "composition": false,
                "owner": false
            },
            "device": {
                "name": "device",
                "description": "Association with Device",
                "type": "Device",
                "cardinality": 1,
                "composition": false,
                "owner": false
            }
        },

        statenet: {
            "Init": {
                "description": "Initial state, represents PLC before it’s “used”",
                "events": {
                    "create": {
                        "Active": {}
                    }
                }
            },
            "Active": {
                "description": "State where PLC is present and usable",
                "color": "#aaaaaa",
                "events": {
                    "update": {
                        "Updated": {
                            "condition": {
                                "description": "If update is valid",
                                "action": "update"
                            }
                        }
                    },
                    "addTo": {
                        "Adding": {
                            "condition": {
                                "description": "If addition is valid",
                                "action": "addTo"
                            }
                        }
                    },
                    "removeFrom": {
                        "Removed": {
                            "condition": {
                                "description": "If removal is valid",
                                "action": "removeFrom"
                            }
                        }
                    },
                    "communicateWithAsset": {
                        "Communication": {
                            "condition": {
                                "description": "If Communication is valid",
                                "action": "communicateWithAsset"
                            }
                        }
                    },
                    "transmitData": {
                        "DataTransmit": {
                            "condition": {
                                "description": "If DataTransmit is valid",
                                "action": "transmitData"
                            }
                        }
                    }
                },
                "actions": {
                    "entry": {
                        "enter1": {
                            "description": "Initialize PLC",
                            "action": "init"
                        }
                    },
                    "exit": {
                        "exit1": {
                            "description": "Finalize PLC",
                            "action": "finalize"
                        }
                    }
                }
            },
            "Updated": {
                "description": "State representing PLC after a successful update"
            },
            "Adding": {
                "description": "State representing PLC in the process of adding something"
            },
            "Removed": {
                "description": "State representing PLC after a successful removal"
            },
            "Communication": {
                "description": "State representing PLC communicating with an asset"
            },
            "DataTransmit": {
                "description": "State representing PLC in the process of transmitting data"
            }
        },


    }
}

module.exports = PLC;
