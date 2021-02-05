
module.exports = {
    name: 'sdi_io',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sdi_io:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sdi_io:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sdi_io:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
