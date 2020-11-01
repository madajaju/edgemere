
module.exports = {
    name: 'amlds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            env: {}
        }
    }
}
