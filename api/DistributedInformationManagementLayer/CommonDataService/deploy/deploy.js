
module.exports = {
    name: 'dimlcds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_cds_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_cds_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_cds_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
