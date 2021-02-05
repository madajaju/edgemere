
module.exports = {
    name: 'sdi',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sdi:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sdi:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sdi:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
