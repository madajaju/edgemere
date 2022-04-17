
class Workload {
    static definition = {
        name: 'Workload',
        description: 'A Workload contains a group of applications that interact based on business rules under' +
            ' specific SLA and QoS',
        attributes: {
            name: {
                type: 'string',
                description: 'Name of the workload',
            }
        },
        associations: {
            applications: {
                type: 'Application',
                cardinality: 'n',
                composition: false,
                owner: false,
            },
            /*
            businessRules: {
                type: 'BusinessRule',
                cardinality: 'n',
                compisition: false,
                owner: false
            },
             */
            /*
            qos: {
                type: 'BusinessRule',
                cardinality: 'n',
                compisition: false,
                owner: false
            },
            sla: {
                type: 'BusinessRule',
                cardinality: 'n',
                compisition: false,
                owner: false
            }
             */
        },
    }
}

module.exports = Workload;

