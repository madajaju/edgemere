
module.exports = {
    name: 'diml_dml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
