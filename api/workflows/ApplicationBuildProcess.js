module.exports = {
    name: "Application Build Process",
    description: "Application Build Process shows how the applications are built in the system",
    activities: {
        // Each activity should map to a use case, scenario, or another workflow.
        // The ability to add parameters should come later for further refinement.
        // The ability to reference another workflow is important as well. This would be in the next section.
        // The ability to show when messages are sent to the system from the actors from an activity to another
        // activity or to a package in the system.
        Init: {
            description: "Initial state for the workflow",
            actor: 'Application Developer', // This could be an actor or package.
            next: {
                "Build Application": {},
            },
        },
        "Build Application": {
            description: "Build Application",
            package: 'Application Management Layer', // This could be an actor or package.
            next: {
                "Build Stack": {
                    condition: {
                        test: "Stacks Need Build",
                        value: "true",
                    },
                },
                "Store Artifact": {
                    condition: {
                        test: "Stacks Need Build",
                        value: "false",
                    }
                },
            },
        },
        "Build Stack": {
            description: "Build Stack",
            package: 'Service Management Layer',
            next: {
                "Build Service": {
                    condition: {
                        test: "Services Need Build",
                        value: "true",
                    },
                },
                "Store Artifact": {
                    condition: {
                        test: "Services Need Build",
                        value: "false",
                    }
                },
            },
        },
        "Build Service": {
            description: "Build Service",
            package: 'Service Management Layer',
            next: {
                "Build Service": {
                    condition: {
                        test: "Services Need Build",
                        value: "true",
                    },
                },
                "Store Artifact": {
                    condition: {
                        test: "Services Need Build",
                        value: "false",
                    }
                },
            },
        },
        "Store Artifact": {
           description: "Store Artifact in the Repository",
            package: "Service Management Layer",
        }
    }
}
