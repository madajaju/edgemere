module.exports = {
    name: 'sml_cb',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_cb_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_cb_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_cb_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
