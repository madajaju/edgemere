
module.exports = {
    name: 'aml_ams',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
