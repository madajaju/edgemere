
module.exports = {
    name: 'ia',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'ia_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'ia_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'ia_prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
