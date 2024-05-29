module.exports = {
    name: "Asset Connectivity Workflow",
    description: "Physical assets need to be monitored and controlled. They are connected to a digital device to collect telemetry data and issue controls to the physical asset. This workflow starts by attesting the physical asset with the digital device to make sure that both trust each other in the security profiles they are operating in. Then, they check for the communication protocol they are communicating, and then they establish a communication pathway.",
    precondition: "This workflow requires that the physical asset and digital device are defined and ready for connection. It is also assumed that the digital device has the necessary capabilities to initiate and maintain a data exchange relationship with the physical asset.",
    postcondition: "Upon successful completion of the workflow, the status of the digital device reflects a successful connection to the physical asset. The physical asset and digital device can now communicate and exchange data seamlessly. The user receives a confirmation that the process of connecting the digital device to the physical asset is successful.",
    activities: {
        "Init": {
            "description": "Start connectivity process",
            "actor": "Actor",
            "package": "PhysicalWorld",
            'inputs': {
                'asset': {
                    "description": "The asset to be connected",
                    "type": "ref",
                    "required": "true",
                },
                'device': {
                    "description": "The device to be connected to",
                    "type": "ref",
                    "required": "true",
                },
            },
            'next': {
                'AssetDigitalDeviceConnectivity': {
                    'inputs': {
                        "asset": (activity) => {
                            return activity.inputs.asset;
                        },
                        "device": (activity) => {
                            return activity.inputs.device;
                        },
                    },
                },
            },
            'outputs': {
                'status': {
                    "description": "Connected status of the device",
                    "fn": (activity) => {
                        return activity.status;
                    },
                },
            },
            "name": "Init",
        },
        "AssetDigitalDeviceConnectivity": {
            'inputs': {
                'asset': {
                    "description": "Physical asset",
                    "type": "ref",
                },
                'device': {
                    "description": "Digital device",
                    "type": "ref",
                },
            },
            "name": "AssetDigitalDeviceConnectivity",
            'obj': {
                "name": "Asset Digital Device Connectivity",
                "description": "Asset Digital Device Connectivity is the description",
                "method": "data/create",
                'actors': {
                    "Actor": "uses",
                },
                'steps': {
                    '0': {
                        "action": "data/list",
                        'parameters': {
                            "name": "hello",
                            "file": "./templates/world.yml",
                        },
                    },
                    '1': {
                        "action": "data/list",
                        'parameters': {
                            "name": "hello",
                            "file": "./templates/world.yml",
                        },
                    },
                },
                "uid": "ConnectPhysicalAssettoaDevice.AssetDigitalDeviceConnectivity",
                "given": "A physical asset needs to be connected to a digital device",
                "when": "The user attempts to connect the physical asset to the digital device",
                "then": "The physical asset should show as connected on the digital device",
            },
            "type": "scenario",
        }
    }
};
