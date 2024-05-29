module.exports = {
    name: "Develop application Process",
    description: `This workflow describes the development process of an application from the initial state to the deployment using the Edgemere system. The process includes the creation of the application in the Edgemere environment, the development of codes by the Application Developer, the process of checking the codes into the Repository, and the build testing phase. If the build test is passed, the application is deployed to the production environment by the DevOps Engineer.`,
    precondition: "The Application Developer should have the necessary knowledge and resources to create, develop, and check in codes for the application. The DevOps Engineer should have the access and permission to deploy the application.",
    postcondition: "At the end of this workflow, the application should be properly developed, tested, and successfully deployed in the production environment by the DevOps Engineer.",
    activities: {
        "Init": {
            "description": "Start monitoring of a particular physical asset.",
            "actor": "System Admininstrator",
            'inputs': {
                'asset': {
                    "description": "Name or ID of the physical asset to be monitored",
                    "type": "string",
                    "default": "",
                    "required": "true",
                },
            },
            'variables': {},
            'next': {
                'Configure Alerts for Asset': {
                    'inputs': {
                        "asset": (activity) => {
                            return activity.inputs.asset;
                        },
                    },
                },
            },
            'outputs': {},
            "name": "Init",
        },
        "Adjust Controls": {
            "description": "Allows the actor to adjust controls of the physical asset based on the monitoring feedback.",
            "actor": "Actor",
            "package": "Change Physical World",
            'inputs': {
                'asset': {
                    "description": "Name or ID of the physical asset being controlled",
                    "type": "string",
                    "default": "",
                    "required": "true",
                },
            },
            'variables': {},
            'next': {},
            'outputs': {
                'result': {
                    "description": "A status message indicating if the control adjustment was successful.",
                    "fn": (activity) => {
                        return activity.inputs.asset + ' controls adjusted successfully.';
                    },
                },
            },
            "name": "Adjust Controls",
        },
        "Configure Alerts for Asset": {
            "description": "Set up alerts for the asset using threshold values for telemetry.",
            "actor": "System Administrator",
            "package": "Manage Physical Assets",
            'inputs': {
                'asset': {
                    "description": "Name or ID of the physical asset for setting up alerts",
                    "type": "string",
                    "required": "true",
                },
                'threshold': {
                    "description": "Threshold values for telemetry data",
                    "type": "json",
                    "required": "true",
                },
            },
            'next': {
                'Monitor QoS': {
                    'inputs': {
                        "asset": (activity) => {
                            return activity.inputs.asset;
                        },
                    },
                },
            },
            'outputs': {},
            "name": "Configure Alerts for Asset",
        },
        "Monitor QoS": {
            "description": "Monitor the Quality of Service (QoS) values for the asset and trigger alerts when they exceed thresholds.",
            "actor": "System Administrator",
            "package": "Monitor Physical World",
            'inputs': {
                'asset': {
                    "description": "Name or ID of the physical asset to be monitored for QoS",
                    "type": "string",
                    "required": "true",
                },
            },
            'next': {
                'Poll Asset Status': {
                    'inputs': {
                        "asset": (activity) => {
                            return activity.inputs.asset;
                        },
                    },
                },
            },
            'outputs': {},
            "name": "Monitor QoS",
        },
        "Poll Asset Status": {
            "description": "Periodically check the status of the physical asset to ensure it is operating as expected.",
            "actor": "System Administrator",
            'inputs': {
                'asset': {
                    "description": "Name or ID of the physical asset whose status is being polled",
                    "type": "string",
                    "required": "true",
                },
            },
            'next': {},
            'outputs': {
                'assetStatus': {
                    "description": "The current status of the physical asset, including any deviations from expected performance.",
                    "fn": (activity) => {
                        return "Polled Status of Asset";
                    },
                },
            },
            "name": "Poll Asset Status",
        }
    }
};
