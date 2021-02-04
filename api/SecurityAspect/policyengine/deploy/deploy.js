
module.exports = {
    name: 'sa_pe',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa_pe:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa_pe:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa_pe:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
