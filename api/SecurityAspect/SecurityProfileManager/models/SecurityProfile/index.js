
class SecurityProfile {
    static definition = {
        name: 'SecurityProfile',
        description: 'A SecurityProfile allows security experts to develop a common profile that can be deployed' +
            ' across multiple environments, services, applications, workloads, based on security identities.',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the security profile',
            }
        },
        associations: {
            policies: {
                description: 'This is the list of policies for the profile.',
                type: 'PolicyCollection',
                cardinality: 1,
                composition: false,
                owner: false,
            },
            enforced: {
                description: 'This is the list of identities being managed by the profile. The profile enforces the' +
                    ' policies against they identities.',
                type: 'Identity',
                cardinality: 'n',
            }
        },
        /*
        statenet: {
            Init: {
                description: "Initial State",
                events: {
                    create: {
                        StateName: { }
                    }
                }
            },
            StateName: {
                description: "My Description of the state",
                events: {
                    eventName: {
                        StateName: {
                            condition: function(obj) { ... },
                            action: function(obj) { ... },
                        }
                    },
                    eventName2 ...
                }
                actions: {
                    entry: { entry1: function(obj) { ... } },
                    exit: { exit1: function(obj): { ... } }
                }
            }
        }
         */

    }
}

module.exports = SecurityProfile;

