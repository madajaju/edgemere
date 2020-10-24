
module.exports = {
    name: 'aml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: '_aml_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: '_aml_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: '_aml_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
