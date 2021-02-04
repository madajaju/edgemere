
module.exports = {
    name: 'sml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sml:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sml:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sml:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
