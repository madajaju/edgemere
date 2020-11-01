
module.exports = {
    name: 'sml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_test',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_prod',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
