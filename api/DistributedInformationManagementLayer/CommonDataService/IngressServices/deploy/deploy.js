
module.exports = {
    name: 'ingress',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_ingress:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_ingress:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_ingress:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
