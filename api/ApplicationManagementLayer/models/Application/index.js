
class Application {
    static definition = {
        name: 'Application',
        description: 'The "Application" class, part of the "aml" package, represents an application that contains multiple SABRs, essentially creating capabilities, and provides methods for creation, destruction, updating, adding to, and removing from; it also contains attributes for name, version, and function bundle instance, and associations with workloads, stacks, data references, and application instances.',
        unique: (obj) => {
            return obj.name;
        },
        extends: false,
        
        attributes: {
    "name": {
        "type": "string",
        "description": "Unique identifier for the application"
    },
    "version": {
        "type": "string",
        "description": "Specific version of the application"
    },
    "fn": {
        "type": "ref",
        "description": "Function for bundle instance run"
    }
},
        
        associations: {
    "workloads": {
        "type": "Workload",
        "cardinality": "n",
        "composition": false,
        "owner": false,
        "via": "app",
        "name": "workloads"
    },
    "stacks": {
        "type": "Stack",
        "cardinality": "n",
        "composition": true,
        "owner": true,
        "via": "app",
        "name": "stacks"
    },
    "data": {
        "type": "DataReference",
        "cardinality": "n",
        "composition": false,
        "owner": false,
        "name": "data"
    },
    "instances": {
        "type": "ApplicationInstance",
        "cardinality": "n",
        "composition": true,
        "owner": true,
        "via": "app",
        "name": "instances"
    }
},
        
        statenet: {
    "Init": {
        "description": "Initial state of the application",
        "events": {
            "create": {
                "Created": {}
            }
        }
    },
    "Created": {
        "description": "State after application is created",
        "events": {
            "addTo": {
                "AddedTo": {
                    "condition": {
                        "description": "Check space",
                        "action": "hasSpaceToAdd"
                    },
                    "action": {
                        "description": "Add item",
                        "action": "addToItem"
                    }
                }
            },
            "update": {
                "Updated": {
                    "condition": {
                        "description": "Need to update",
                        "action": "needsUpdate",
                        "fn": "function(obj) { return obj.needsUpdate(); }"
                    },
                    "action": {
                        "description": "Update app.",
                        "action": "updateItem",
                        "fn": "function(obj) { obj.updateItem(); }"
                    }
                }
            },
            "removeFrom": {
                "RemovedFrom": {
                    "condition": {
                        "description": "Item to remove",
                        "action": "hasItemToRemove",
                        "fn": "function(obj) { return obj.hasItemToRemove(); }"
                    },
                    "action": {
                        "description": "Remove item",
                        "action": "removeItem",
                        "fn": "function(obj) { obj.removeItem(); }"
                    }
                }
            },
            "destroy": {
                "Destroyed": {
                    "condition": {
                        "description": "Can destroy",
                        "action": "canBeDestroyed",
                        "fn": "function(obj) { return obj.canBeDestroyed(); }"
                    },
                    "action": {
                        "description": "Destroy app.",
                        "action": "destroyApplication",
                        "fn": "function(obj) { obj.destroyApplication(); }"
                    }
                }
            }
        },
        "actions": {
            "entry": {
                "entry1": {
                    "description": "Initialize item",
                    "action": "initializeItem",
                    "fn": "function(obj) { obj.initializeItem(); }"
                }
            },
            "exit": {
                "exit1": {
                    "description": "Delete item",
                    "action": "deleteItem",
                    "fn": "function(obj) { obj.deleteItem(); }"
                }
            }
        }
    },
    "AddedTo": {
        "description": "State after something is added to the application",
        "events": {
            "missingMethod1": {
                "MissingState": {}
            }
        }
    },
    "Updated": {
        "description": "State after the application is updated",
        "events": {
            "missingMethod2": {
                "MissingState": {}
            }
        }
    },
    "RemovedFrom": {
        "description": "State after something is removed from the application",
        "events": {
            "missingMethod3": {
                "MissingState": {}
            }
        }
    },
    "Destroyed": {
        "description": "State after application is destroyed",
        "events": {}
    }
},
        
        view: {
            color: "#00aaff",
            object2d: (options) => {
                // Triangle
                let material = {color: "#00aaff", border: "#000000"};
                if (options) {
                    material = options;
                }
                return `<rect width="10" height="10"style="fill:${material.color};stroke:${material.border};stroke-width:1" />`;
            },
            object3d: (options) => {

                let materials = {
                    '': `color:#00aaff; transparent:true, opacity:0.90;`,
                    'Selected': `color:#ffff00; transparent:true, opacity:0.90;`,
                    'Targeted': `color:#00ff00; transparent:true, opacity:0.90;`,
                    'Sourced': `color:#ff0000; transparent:true, opacity:0.90;`
                };
                let retval = "";
                for (let i in materials) {
                    retval += `<a-entity id="Application3D${i}">` +
                        `<a-box width="20" height="20" depth="20" material="${materials[i]}" ></a-box>` +
                        `</a-entity>`;
                }
                return retval;
            },
        }
    }
}
module.exports = Application;
