
module.exports = {
    name: 'aml_as',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_as_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_as_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_as_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
