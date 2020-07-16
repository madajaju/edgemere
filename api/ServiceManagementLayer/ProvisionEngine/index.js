module.exports = {
    shortname: 'pe',
    name: 'Provision Engine',
    description: 'Provision Engine is a subsystem that provisions services onto the resources. It should provision' +
        ' everything necessary for the service to be deployed. Including but not limited to OS, libraries, security' +
        ' patches, monitoring etc...',
    color: '#lightgreen',
    depends: [ "Software Defined Infrastructure" ]
};
