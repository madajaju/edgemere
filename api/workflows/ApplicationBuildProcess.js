module.exports = {
    name: "Application Build Process",
    description: `The 'Application Build Process' begins with an application developer in the initial state. The developer enters the build application stage addressed by the package 'Application Management Layer'. The Application may need its stack built or the artifact stored depending on conditions. The building of the stack is handled by the 'Service Management Layer' package, similarly with the micro-service build. Finally, the artifact is stored marking the end of the workflow.`,
    precondition: "This workflow assumes that the user has all necessary access to the application and its dependencies. The Application Developer, DevOps Engineer, and Stack Developer are equipped with the necessary permissions to create, list, and update applications, AI models, workloads, and stacks. It also assumes that source codes are readily available for this process.",
    postcondition: "Once the application build process is completed, the application 'helloWorldApp' would have been built with its AI Model. The stack has been built using the provided file './templates/world.yml' and the micro-service has been built as a container image. The artifact resulting from this process will be stored in the repository, marking the successful end of the workflow.",
    activities: {
        "Init": {
            "description": "Initial state for the workflow",
            "actor": "Application Developer",
            'next': {
                'Build Application': {},
            },
            "name": "Init",
        },
        "Build Application": {
            "description": "Build the application and all of its dependencies",
            "package": "Application Management Layer",
            'next': {
                'Build Stack': {
                    'condition': {
                        "test": "Stacks Need Build",
                        "value": "true",
                    },
                },
                'Store Artifact': {
                    'condition': {
                        "test": "Stacks Need Build",
                        "value": "false",
                    },
                },
            },
        },
        "Build Stack": {
            "description": "Build a stack of services and all of its dependencies",
            "package": "Service Management Layer",
            'next': {
                'Build Service': {
                    'condition': {
                        "test": "Services Need Build",
                        "value": "true",
                    },
                },
                'Store Artifact': {
                    'condition': {
                        "test": "Services Need Build",
                        "value": "false",
                    },
                },
            },
            "type": "scenario",
            "name": "Build Stack",
        },
        "Build Service": {
            "description": "Build a micro-services as a container image.",
            "package": "Service Management Layer",
            'next': {
                'Build Service': {
                    'condition': {
                        "test": "Services Need Build",
                        "value": "true",
                    },
                },
                'Store Artifact': {
                    'condition': {
                        "test": "Services Need Build",
                        "value": "false",
                    },
                },
            },
            "type": "scenario",
            "name": "Build Service",
        },
        "Store Artifact": {
            "description": "Store Artifact in the Repository",
            "package": "Service Management Layer",
            "name": "Store Artifact",
        }
    }
};
