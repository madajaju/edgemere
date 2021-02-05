module.exports = {
    name: 'sml_cb',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_cb:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_cb:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_cb:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
