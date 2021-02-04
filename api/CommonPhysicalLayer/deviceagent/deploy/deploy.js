
module.exports = {
    name: 'cpl_da',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'cpl_da_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'cpl_da_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'cpl_da_prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
