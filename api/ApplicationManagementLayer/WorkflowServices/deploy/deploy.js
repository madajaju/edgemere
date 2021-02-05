
module.exports = {
    name: 'aml_ws',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'aml_ws_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'aml_ws_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'aml_ws_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
