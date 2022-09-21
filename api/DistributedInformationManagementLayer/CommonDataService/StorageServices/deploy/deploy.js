
module.exports = {
    name: 'storage',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_storage:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_storage:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_storage:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
