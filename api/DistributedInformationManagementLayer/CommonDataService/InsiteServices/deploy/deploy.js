
module.exports = {
    name: 'insite',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_insite:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_insite:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_insite:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
