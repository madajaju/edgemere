module.exports = {
    "name": "Create Environment",
    "description": "IT Opererations create environments and assigns a Multi Cloud to the" +
        " Environment",
    "method": "environment/create",
    "actors": {"IT Operations": "uses"},
    "uid": "ManageEnvironment.CreateEnvironment",
    "given": "IT Operations has access to create an environment",
    "when": "IT Operations creates an environment and assigns a Multi Cloud ",
    "then": "The environment should be successfully created with the assigned Multi Cloud"
};
