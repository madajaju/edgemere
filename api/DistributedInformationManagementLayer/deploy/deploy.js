
module.exports = {
    name: 'diml',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
