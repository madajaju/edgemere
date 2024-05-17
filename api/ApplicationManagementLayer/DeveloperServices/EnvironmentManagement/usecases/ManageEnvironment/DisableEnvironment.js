module.exports = {
    "name": "Disable Environment",
    "description": "IT Operations disables an environment so services are suspended and cannot launch",
    "method": "environment/disable",
    "actors": {"IT Operations": "uses"},
    "uid": "ManageEnvironment.DisableEnvironment",
    "given": "IT Operations has access to manage environments",
    "when": "IT Operations executes the 'environment/disable' command",
    "then": "Services are suspended and cannot launch in the disabled environment"
};
