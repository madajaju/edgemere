
module.exports = {
    name: 'ingress',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_ingress_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_ingress_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_ingress_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
