
module.exports = {
    name: 'aml_ds',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ds_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
