
class Environment {
    static definition = {
        name: 'Environment',
        description: 'An environment represents a group of clouds, and policies that service are deployed. ' +
            'Examples of environments are development, test, production',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the environment'
            }
        },
        associations: {
            clouds: {
                type: 'MultiCloud',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            policies: {
                type: 'PolicyCollection',
                cardinality: 1,
                composition: false,
                owner: false
            }
        },
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        Enabled: { }
                    }
                }
            },
            Enabled: {
                description: "Environment is available to be used",
                events: {
                    disable: {
                        Disabled: { }
                    }
                }
            },
            Disabled: {
                description: "Environment is not available to be used",
                events: {
                    enable: {
                        Enabled: { }
                    }
                }
            }
        }
    }
}

module.exports = Environment;

