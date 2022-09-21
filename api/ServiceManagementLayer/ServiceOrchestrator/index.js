module.exports = {
    shortname: 'so',
    name: 'Service Orchestrator',
    description: 'Service Orchestrator builds landscape requests for the service or stack. The Landscape Request' +
        ' is generated from the service and stack deployments and coordinates with the Infrastructure Orchestrator' +
        ' Data Orchestrator, and the Application Orchestrator.',
    color: '#88cc88',
    depends: [ "Service Controller", "Service Repository", "Data Orchestrator", "Infrastructure Orchestrator" ]
};
