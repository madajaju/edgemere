module.exports = {
    name: 'transform',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_transform_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_transform_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_transform_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
