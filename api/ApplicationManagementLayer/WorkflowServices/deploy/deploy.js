
module.exports = {
    name: 'amlws',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ws_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ws_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ws_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
