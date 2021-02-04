
module.exports = {
    name: 'sml_sr',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml_sr:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml_sr:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml_sr:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
