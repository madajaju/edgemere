
module.exports = {
    name: 'storage',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_storage_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_storage_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_storage_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
