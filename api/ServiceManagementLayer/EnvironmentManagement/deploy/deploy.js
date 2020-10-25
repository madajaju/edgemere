
module.exports = {
    name: 'sml_em',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_em_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_em_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_em_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
