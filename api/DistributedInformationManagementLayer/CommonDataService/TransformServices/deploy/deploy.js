module.exports = {
    name: 'transform',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_transform:dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_transform:test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_transform:prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
