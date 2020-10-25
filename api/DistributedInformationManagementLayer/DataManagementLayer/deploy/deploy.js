
module.exports = {
    name: 'diml_dml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
