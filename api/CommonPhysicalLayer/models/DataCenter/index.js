class DataCenter {
    static definition = {
        name: 'DataCenter',
        description: 'The "DataCenter" class, belonging to the CPL package, facilitates the management of physical data centers, including operations such as creating, updating, disabling, enabling, and destroying data centers, managing devices within the data center, capacity planning, and handling device reservations.',
        unique: false,


        attributes: {
            "name": {
                "type": "string",
                "description": "Name of the Datacenter"
            }
        },

        associations: {
            "profile": {
                "type": "PhysicalProfile",
                "cardinality": 1,
                "composition": true,
                "name": "profile"
            },
            "devices": {
                "type": "Device",
                "cardinality": "n",
                "composition": false,
                "owner": true,
                "unique": true,
                "via": "datacenter",
                "name": "devices"
            },
            "adevices": {
                "type": "AggregatedDevice",
                "cardinality": "n",
                "composition": false,
                "owner": true,
                "unique": true,
                "via": "datacenter",
                "name": "adevices"
            }
        },

        statenet: {
            "Init": {
                "description": "Data Center is not created",
                "events": {
                    "create": {
                        "Enabled": {
                            "condition": {
                                "description": "Checks file existence",
                                "action": "file.check"
                            },
                            "action": {
                                "description": "Creates Data Center",
                                "action": "create"
                            }
                        }
                    }
                }
            },
            "Enabled": {
                "description": "Data Center is enabled",
                "color": "#00FF00",
                "events": {
                    "disable": {
                        "Disabled": {
                            "action": {
                                "description": "Disables Data Center",
                                "action": "disable"
                            }
                        }
                    },
                    "destroy": {
                        "Destroyed": {
                            "action": {
                                "description": "Destroys Data Center",
                                "action": "destroy"
                            }
                        }
                    },
                    "update": {
                        "Updated": {
                            "condition": {
                                "description": "Checks for updates",
                                "action": "update.check"
                            },
                            "action": {
                                "description": "Updates Data Center",
                                "action": "update"
                            }
                        }
                    },
                    "reserve": {
                        "Reserved": {
                            "condition": {
                                "description": "Checks resource availability",
                                "action": "reserve.check"
                            },
                            "action": {
                                "description": "Reserves Resource",
                                "action": "reserve"
                            }
                        }
                    }
                },
                "actions": {
                    "entry": {
                        "description": "Logs Data Center creation",
                        "action": "log.create"
                    }
                }
            },
            "Disabled": {
                "description": "Data Center is disabled",
                "color": "#FF0000",
                "events": {
                    "enable": {
                        "Enabled": {
                            "action": {
                                "description": "Enables Data Center",
                                "action": "enable"
                            }
                        }
                    },
                    "destroy": {
                        "Destroyed": {
                            "action": {
                                "description": "Destroys Data Center",
                                "action": "destroy"
                            }
                        }
                    }
                },
                "actions": {
                    "entry": {
                        "description": "Logs Data Center disabling",
                        "action": "log.disable"
                    }
                }
            },
            "Destroyed": {
                "description": "Data Center is destroyed",
                "color": "#000000",
                "actions": {
                    "entry": {
                        "description": "Logs Data Center destruction",
                        "action": "log.destroy"
                    }
                }
            },
            "Updated": {
                "description": "Data Center is updated",
                "color": "#FFFF00",
                "actions": {
                    "entry": {
                        "description": "Logs Data Center update",
                        "action": "log.update"
                    },
                    "exit": {
                        "description": "Returns to Enabled state",
                        "action": "back.enabled"
                    }
                }
            },
            "Reserved": {
                "description": "Resource is reserved",
                "color": "#00FFFF",
                "actions": {
                    "entry": {
                        "description": "Logs resource reservation",
                        "action": "log.reserve"
                    },
                    "exit": {
                        "description": "Returns to Enabled state",
                        "action": "back.enabled"
                    }
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
                return `<rect width="20" height="40" style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
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
                    retval += `<a-entity id="DataCenter3D${i}">` +
                        `<a-box width="20" height="40" depth="20" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            },
        }

    }
}

module.exports = DataCenter;
