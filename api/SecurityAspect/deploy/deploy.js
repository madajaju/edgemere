
module.exports = {
    name: 'sa',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'sa_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'sa_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'sa_prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
