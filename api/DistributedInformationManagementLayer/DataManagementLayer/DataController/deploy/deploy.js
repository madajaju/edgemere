
module.exports = {
    name: 'diml_dml_dc',
    contexts: {
        dev: {
            type: 'swarm',
            tag: 'diml_dml_dc:dev',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        test: {
            type: 'swarm',
            tag: 'diml_dml_dc:test',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        },
        prod: {
            type: 'swarm',
            tag: 'diml_dml_dc:prod',
            file: 'docker-compose.yml',
            design: 'services.js',
            env: {}
        }
    }
}
