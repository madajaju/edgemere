module.exports = {
    name: 'resource.provisioning',
    handlers: [
        {
            action: '/cpl/provision',
            fn: (data) => {
                console.log("Data Conversion ===============================================");
                return {resource: data.obj};
            }
        }
    ]
};
