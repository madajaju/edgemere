
module.exports = {
    name: 'sml_sc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sc_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sc_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sc_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
