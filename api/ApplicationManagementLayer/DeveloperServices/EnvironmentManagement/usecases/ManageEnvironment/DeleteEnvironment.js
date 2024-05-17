module.exports = {
    "name": "Delete Environment",
    "description": "Delete Environment allows IT Operations to delete an environment and suspend all services running in the environment.",
    "method": "environment/destroy",
    "actors": {
            "IT Operations": "uses"
    } ,
    "uid": "ManageEnvironment.DeleteEnvironment",
    "given": "IT Operations has access to an environment with running services",
    "when": "IT Operations uses the environment/destroy method",
    "then": "The environment is deleted and all services in the environment are suspended"
};
