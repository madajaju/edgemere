module.exports = {
    "name": "Asset Digital Device Connectivity",
    "description": "Asset Digital Device Connectivity is the" +
        " description",
    "method": "data/create",
    "actors": {"Actor": "uses"},
    "steps": [
        {"action": "data/list", "parameters": {"name": "hello", "file": "./templates/world.yml"}},
        {"action": "data/list", "parameters": {"name": "hello", "file": "./templates/world.yml"}}
    ],
    "uid": "ConnectPhysicalAssettoaDevice.AssetDigitalDeviceConnectivity",
    "given": "A physical asset needs to be connected to a digital device",
    "when": "The user attempts to connect the physical asset to the digital device",
    "then": "The physical asset should show as connected on the digital device"
};
