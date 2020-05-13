
class WorkloadTemplate {
    static definition = {
        name: 'WorkloadTemplate',
        description: 'Description ' +
            'long description',
        attributes: {
            attr1: {
                type: 'string',
                description: 'description' +
                    ' long description'
            }
        },
        associations: {
            assoc1: {
                type: 'ModelName',
                cardinality: 1,
                composition: false,
                owner: false,
            },
        },
    }
}

module.exports = WorkloadTemplate;

