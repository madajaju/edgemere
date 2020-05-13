
class ApplicationInstance {
    static definition = {
        name: 'ApplicationInstance',
        description: 'Application Instance that is running in the ecosystem',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the application instance'
            },
            status: {
                type: 'string',
                description: 'Name of the application instance'
            },
            message: {
                type: 'string',
                description: 'Last message in the application instance'
            }
        },
        associations: {
            assoc1: {
                type: 'ModelName',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
        statenet: {
            Init: {
                events: {
                    create: {
                        Initializing: {}
                    }
                }
            },
            Initializing: {
                events: {
                    provisoned: {
                        Running: {}
                    }
                }
            },
            Running: {
                events: {
                    kill: {
                        Stopping: {}
                    }
                }
            },
            Stopping: {
                events: {
                    stopped: {
                        Stopped: {}
                    }
                }
            },
            Stopped: {
                events: {
                    exit: {
                        Exit: {}
                    },
                    failed: {
                        Failed: {}
                    }
                }
            },
            Exit: {
            },
            Failed: {
            }
        }
    }
}

module.exports = ApplicationInstance;

