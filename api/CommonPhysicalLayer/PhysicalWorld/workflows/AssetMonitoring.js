module.exports = {
    name: "Asset Monitoring",
    description: `The 'Asset Monitoring' workflow is designed to facilitate real-time monitoring and control of a physical asset. It begins with the initiation of real-time monitoring for a specific physical asset, followed by necessary adjustments to the asset's controls based on monitoring feedback.

1. A System Admin connects the physical asset to a digital device that can collect telemetry from the asset.
2. A set of threshold values are used to send alerts if the physical asset telemetry values are out of the range of the threshold.
3. The device is monitored for those QoS values and alerts are thrown if it goes beyond the QoS.
4. Periodic status is polled from the physical asset to make sure it is still operating as expected.`,
    precondition: "The physical asset should be equipped with sensors and a communication pathway for data transmission. The asset should also be in operational state for monitoring and control.",
    postcondition: "The physical asset is successfully monitored, and its controls are adjusted as per the requirements. The current state and function of the asset are known, and the output of the asset is optimized as per the user's requirements.",
    activities: {
        "Init": {
            "description": "Start monitoring of a particular physical asset.",
            "actor": "Actor",
            "package": "Monitor Physical World",
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
                'Adjust Controls': {
                    'inputs': {},
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
        }
    }
};
