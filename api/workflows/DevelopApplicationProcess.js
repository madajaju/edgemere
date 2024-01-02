module.exports = {
    name: "Develop application Process",
    description: "This process describes how t odevelop an application in the Edgemere system",
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
                "Create Application": {},
            },
        },
        "Create Application": {
            description: "Create an application to be developed in the edgemere architecture",
            package: 'Application Management Layer', // This could be an actor or package.
            next: {
                "Write Code": { },
            },
        },
        "Write Code": {
            description: "The Application Developer Write Codes for the application",
            actor: 'Application Developer', // This could be an actor or package.
            next: {
                "Check In Code": { },
            },
        },
        "Check In Code": {
            description: "The Application Developer Checks Code into the Repository",
            package: 'Application Management Layer',
            next: {
                "Application Build Process": { },
            },
        },
        "Application Build Process": {
            description: "Process to build and test the application",
            package: "Edgemere",
            next: {
                "Deploy Application": {
                    condition: {
                        test: "Build Test Pass",
                        value: "true",
                    },
                },
                "Write Code": {
                    condition: {
                        test: "Build Test Pass",
                        value: "false",
                    }
                },
            },
        },
        "Deploy Application": {
            description: "Deploy Application to the Production Environment",
            package: 'Application Management Layer',
        }
    }
}
