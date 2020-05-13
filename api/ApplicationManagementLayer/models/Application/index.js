
class Application {
    static definition = {
        name: 'Application',
        description: 'Description ' +
            'long description',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the Application'
            },
            version: {
                type: 'string',
                description: 'Version of the Application'
            },
        },
        associations: {
            workloads: {
                type: 'Workload',
                cardinality: 'n',
                composition: false,
                owner: false,
                via: 'app'
            },
            stacks: {
                type: 'Stack',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'app'
            },
            data: {
                type: 'DataReference',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            instances: {
                type: 'ApplicationInstance',
                cardinality: 'n',
                composition: true,
                owner: true,
                via: 'app'
            },
        },
    }
}

module.exports = Application;

