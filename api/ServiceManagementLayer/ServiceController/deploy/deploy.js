
module.exports = {
    name: 'sml_sc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sc:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sc:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sc:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
