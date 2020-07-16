module.exports = {
    shortname: 'sc',
    name: 'Service Controller',
    description: 'Service Controller is responsible for the management of services on the resources' +
        ' allocated for the service. The Provision Engine is called from the Service Controller. It will call' +
        ' the Provision Engine when the service needs to be deployed.',
    color: '#lightgreen',
    depends: ['Provision Engine']
};
