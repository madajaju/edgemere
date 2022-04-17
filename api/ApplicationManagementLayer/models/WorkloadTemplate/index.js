
class WorkloadTemplate {
    static definition = {
        name: 'WorkloadTemplate',
        description: 'A WorkloadTemplate allows developers to paramaterize workloads so they can be reused in' +
            ' several different areas. Workloads are created based on arguments passed into the template for' +
            ' creation of a Workload.',
        attributes: {
            name: {
                type: 'string',
                description: 'name of the workload template'
            },
            args: {
                type: 'json',
                description: 'Name value pairs used for the creation of applications from the template.'
            }
        },
        associations: {
            workloads: {
                type: 'Workload',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
        },
    }
}

module.exports = WorkloadTemplate;

