module.exports = {
    name: "Application Development Process",
    description: "Application Developer process for common development.",
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
                "Manage Applications": {},
            },
            actions: {
                'application/create': {},
            },
            messages: [
                'application.needed',
            ]
        },
        "Manage Applications": {
            description: "Write code",
            actor: 'Application Developer', // This could be an actor or package.
            next: {
                "Create Application Stack": {},
                "Create Service Stack": {},
            },
            actions: {
                'application/create': {},
            },
            messages: [
                'application.needed',
            ]
        },
        "Create Application Stack": {
            description: "Create an application stack",
            package: 'edgemere',
            next: {
                "Modify Application Stack": {}
            },
        },
        "Modify Application Stack": {
            description: "Create an application stack",
            package: 'edgemere',
            next: {
                "Version Application Stack": {}
            },
        },
        "Version Application Stack": {
            description: "Version an application stack",
            package: 'edgemere',
            next: {
                "Test Application Stack": {}
            },
        },
        "Create Service Stack": {
            description: "Create an application stack",
            package: 'edgemere',
            next: {
                "Modify Service Stack": {}
            },
        },
        "Modify Service Stack": {
            description: "Create an application stack",
            package: 'edgemere',
            next: {
                "Application Build Process": {},
            },
        },
        "Application Build Process": {
            description: "Run the code through the build process",
            package: 'Service Management Layer',
            next: {
                "Test Service Stack": {
                    condition: {
                        test: "Build Results",
                        value: "Passed",
                    }
                },
                "Modify Service Stack": {
                    condition: {
                        test: "Build Results",
                        value: "Failed",
                    }
                },
            }
        },
        "Test Service Stack": {
            description: "Test the service stack in an environment",
            package: 'edgemere',
            next: {
                "Version Service Stack": {
                    condition: {
                        test: "Service Test",
                        value: "success",
                        action: 'service/testResults',
                        fn: (obj) => {
                            return true;
                        }
                    },
                },
                "Manage Applications": {
                    condition: {
                        test: "Service Test",
                        value: "failed",
                    }
                },
            }
        },
        "Version Service Stack": {
            description: "Version an application stack",
            package: 'edgemere',
            next: {
                "Test Application Stack": {}
            },
        },
        "Test Application Stack": {
            description: "Test an application stack",
            package: 'Application Management Layer',
            next: {
                "Create Application": {}
            },
        },
        "Create Application": {
            description: "Create an application from the stack",
            package: 'Application Management Layer',
            next: {
                "Deploy Application": {},
            },
        },
        "Deploy Application": {
            description: "Launch an application in an environment",
            package: 'Application Management Layer',
            next: {
                "Destroy Application": {},
            },
        },
        "Destroy Application": {
            package: "Application Management Layer",
            description: "Destroy Application",
        },
    }
}
