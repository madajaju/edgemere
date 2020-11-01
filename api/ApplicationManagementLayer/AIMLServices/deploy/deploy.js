
module.exports = {
    name: 'ams',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ams_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
