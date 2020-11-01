
module.exports = {
    name: 'sml_sr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sr_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sr_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sr_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
